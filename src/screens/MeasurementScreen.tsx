import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { patientStorage } from '../utils/storage';
import { Measurement, SpineRegion } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme, radius } from '../utils/theme';
import SpineModel from '../components/SpineModel';

interface MeasurementScreenProps {
  navigation: any;
  route: any;
}

/** SRS / SOSORT / Weinstein thresholds. */
const SEVERITY_BANDS = [
  { key: 'normal',   range: '<10',   color: '#10b981' },
  { key: 'mild',     range: '10–20', color: '#f59e0b' },
  { key: 'moderate', range: '20–40', color: '#f97316' },
  { key: 'severe',   range: '40–50', color: '#ef4444' },
  { key: 'surgical', range: '>50',   color: '#b91c1c' },
] as const;

export default function MeasurementScreen({ navigation, route }: MeasurementScreenProps) {
  const { t } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { patientId } = route.params;

  const [angle, setAngle] = useState(0);
  const [location, setLocation] = useState<SpineRegion>('thoracic');
  const [notes, setNotes] = useState('');
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [calibrationOffset, setCalibrationOffset] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [rawGamma, setRawGamma] = useState(0);

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      const timer = setTimeout(() => handleCalibrate(), 500);
      return () => {
        clearTimeout(timer);
        ScreenOrientation.unlockAsync();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
    }, [])
  );

  useEffect(() => {
    startSensor();
    return () => { stopSensor(); };
  }, [calibrationOffset]);

  const startSensor = async () => {
    try {
      await DeviceMotion.setUpdateInterval(100);
      const sub = DeviceMotion.addListener((data) => {
        if (data.rotation) {
          const betaDeg = data.rotation.beta * (180 / Math.PI);
          setRawGamma(betaDeg);
          setAngle(Math.round(Math.abs(betaDeg - calibrationOffset)));
        }
      });
      setSubscription(sub);
    } catch {
      Alert.alert(t('common.error'), t('measurement.error_sensors'));
    }
  };

  const stopSensor = () => { subscription?.remove(); setSubscription(null); };

  const handleCalibrate = () => {
    setCalibrationOffset(rawGamma);
    setIsCalibrated(true);
    Alert.alert('', t('measurement.calibrated'));
  };

  const handleSave = async () => {
    if (!isCalibrated) { Alert.alert('', t('measurement.error_calibrate')); return; }
    if (!isMeasuring) { Alert.alert('', t('measurement.error_start')); return; }
    try {
      const measurement: Measurement = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        angle,
        // Store the region key so the label re-translates with the app
        // language; `location` stays as a snapshot for legacy readers.
        locationKey: location,
        location: t(`measurement.${location}`),
        notes: notes.trim() || undefined,
      };
      await patientStorage.addMeasurement(patientId, measurement);
      Alert.alert('', t('measurement.success'), [
        { text: t('common.ok'), onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert(t('common.error'), t('measurement.error_save'));
    }
  };

  const bg = theme.colors.background;
  const surface = isDark ? '#0f2744' : '#ffffff';
  const border = theme.colors.border;
  const text = theme.colors.onBackground;
  const muted = theme.colors.textSecondary;
  const accent = '#1a4fa0';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>

      {/* Angle display */}
      <LinearGradient colors={['#0a1628', '#0f2744', '#1a3a6c']} style={styles.angleHero}>
        <Text style={styles.angleNum}>{angle}<Text style={styles.angleDeg}>°</Text></Text>
        <View style={styles.statusRow}>
          {!isCalibrated && (
            <View style={[styles.chip, { backgroundColor: 'rgba(248,113,113,0.15)', borderColor: '#f87171' }]}>
              <Text style={[styles.chipText, { color: '#f87171' }]}>{t('measurement.not_calibrated')}</Text>
            </View>
          )}
          {isMeasuring && (
            <View style={[styles.chip, { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: '#10b981' }]}>
              <Text style={[styles.chipText, { color: '#10b981' }]}>{t('measurement.measuring')}</Text>
            </View>
          )}
        </View>

        {/* Angle progress bar */}
        <View style={styles.progressWrap}>
          {/* Scale — SRS / SOSORT / Weinstein thresholds */}
          <View style={styles.progressScaleRow}>
            <Text style={styles.progressScaleLabel}>0°</Text>
            <Text style={styles.progressScaleLabel}>10°</Text>
            <Text style={styles.progressScaleLabel}>20°</Text>
            <Text style={styles.progressScaleLabel}>40°</Text>
            <Text style={styles.progressScaleLabel}>50°</Text>
          </View>
          <View style={styles.progressTrack}>
            {/* Normal <10 · Mild 10-20 · Moderate 20-40 · Severe ≥40 (surgical ≥50) */}
            <View style={[styles.progressZone, { flex: 10 / 90, backgroundColor: 'rgba(16,185,129,0.28)' }]} />
            <View style={[styles.progressZone, { flex: 10 / 90, backgroundColor: 'rgba(245,158,11,0.26)' }]} />
            <View style={[styles.progressZone, { flex: 20 / 90, backgroundColor: 'rgba(249,115,22,0.24)' }]} />
            <View style={[styles.progressZone, { flex: 10 / 90, backgroundColor: 'rgba(239,68,68,0.22)' }]} />
            <View style={[styles.progressZone, { flex: 40 / 90, backgroundColor: 'rgba(185,28,28,0.18)' }]} />
            <View style={[styles.progressFill, {
              width: `${Math.min(angle, 90) / 90 * 100}%`,
              backgroundColor: angle < 10 ? '#10b981' : angle < 20 ? '#f59e0b' : angle < 40 ? '#f97316' : '#ef4444',
            }]} />
            <View style={styles.progressZeroTick} />
          </View>
          <View style={styles.progressSeverityRow}>
            {SEVERITY_BANDS.map((band) => (
              <Text key={band.key} style={[styles.progressSeverityText, { color: band.color }]}>
                {band.range}{'\n'}{t(`measurement.severity_${band.key}`)}
              </Text>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Gauge */}
      <View style={[styles.gaugeWrap, { backgroundColor: surface }]}>
        <View style={styles.gauge}>
          {/* Minor ticks — every 15°, no label */}
          {[15, 30, 60, 75, 105, 120, 150, 165].map((deg) => (
            <View key={`m${deg}`} style={[styles.tick, { transform: [{ rotate: `${-90 + deg}deg` }] }]}>
              <View style={[styles.minorTickLine, { backgroundColor: isDark ? '#2a3f5f' : '#b8cce8' }]} />
            </View>
          ))}
          {/* Major ticks — every 45° with labels */}
          {[0, 45, 90, 135, 180].map((deg) => (
            <View key={deg} style={[styles.tick, { transform: [{ rotate: `${-90 + deg}deg` }] }]}>
              <View style={[styles.tickLine, { backgroundColor: isDark ? '#2563eb' : '#1a4fa0' }]} />
              <Text style={[styles.tickLabel, { color: isDark ? '#4f80d0' : '#1a4fa0' }]}>{deg}°</Text>
            </View>
          ))}
          <View style={[styles.needle, { backgroundColor: accent, transform: [{ rotate: `${-90 + angle}deg` }] }]} />
          <View style={[styles.needleCap, { backgroundColor: surface, borderColor: accent }]} />
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {!isCalibrated ? (
          <TouchableOpacity onPress={handleCalibrate}>
            <LinearGradient colors={['#1a4fa0', '#0f2f6e']} style={styles.primaryBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.primaryBtnText}>{t('measurement.calibrate')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : !isMeasuring ? (
          <View style={{ gap: 12 }}>
            <TouchableOpacity onPress={() => setIsMeasuring(true)}>
              <LinearGradient colors={['#1a4fa0', '#0f2f6e']} style={styles.primaryBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.primaryBtnText}>{t('measurement.start')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCalibrate} style={[styles.outlineBtn, { borderColor: border }]}>
              <Text style={[styles.outlineBtnText, { color: text }]}>{t('measurement.recalibrate')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            <View style={[styles.locationCard, { backgroundColor: surface }]}>
              <Text style={[styles.sectionLabel, { color: muted }]}>
                {t('measurement.spinal_location').toUpperCase()}
              </Text>
              <SpineModel selected={location} onSelect={setLocation} isDark={isDark} />
            </View>

            <TextInput
              label={t('measurement.notes_optional')}
              value={notes}
              onChangeText={setNotes}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={[styles.notesInput, { backgroundColor: surface }]}
              textColor={text}
              outlineColor={border}
              activeOutlineColor={accent}
            />

            <TouchableOpacity onPress={handleSave}>
              <LinearGradient colors={['#1a4fa0', '#0f2f6e']} style={styles.primaryBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.primaryBtnText}>{t('measurement.save')} ({angle}°)</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsMeasuring(false)} style={[styles.outlineBtn, { borderColor: border }]}>
              <Text style={[styles.outlineBtnText, { color: text }]}>{t('measurement.cancel')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  angleHero: { paddingVertical: 32, alignItems: 'center', gap: 10, paddingHorizontal: 20 },
  angleNum: { fontSize: 88, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: -3 },
  angleDeg: { fontSize: 40, color: 'rgba(255,255,255,0.5)', fontFamily: 'SpaceGrotesk_300Light' },
  statusRow: { flexDirection: 'row', gap: 8, minHeight: 30 },
  chip: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.sm, borderWidth: 1 },
  chipText: { fontSize: 12, fontFamily: 'SpaceGrotesk_500Medium' },

  /* ── progress bar ── */
  progressWrap: { width: '100%', marginTop: 4 },
  progressScaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  progressScaleLabel: {
    fontSize: 10, color: 'rgba(255,255,255,0.45)',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  progressTrack: {
    height: 7, borderRadius: radius.xs,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden', flexDirection: 'row',
  },
  progressZone: { height: '100%' },
  progressFill: {
    position: 'absolute', top: 0, left: 0, height: '100%',
    borderRadius: radius.xs, opacity: 0.9,
  },
  progressZeroTick: {
    position: 'absolute', left: 0, top: -3,
    width: 1.5, height: 13, backgroundColor: 'rgba(255,255,255,0.6)',
  },
  progressMidTick: {
    position: 'absolute', left: '50%', top: -2,
    width: 1.5, height: 11, backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressSeverityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 2,
  },
  progressSeverityText: {
    fontSize: 9, fontFamily: 'SpaceGrotesk_500Medium', opacity: 0.85,
  },

  /* ── gauge ── */
  gaugeWrap: { marginHorizontal: 20, marginTop: 16, borderRadius: radius.lg, padding: 20, alignItems: 'center' },
  gauge: {
    width: 240, height: 240, borderRadius: 120,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(26,79,160,0.4)',
  },
  tick: { position: 'absolute', width: 240, height: 240, justifyContent: 'flex-start', alignItems: 'center' },
  tickLine: { width: 3, height: 22, marginTop: 6, borderRadius: 0 },
  minorTickLine: { width: 1.5, height: 12, marginTop: 8, borderRadius: 0 },
  tickLabel: { fontSize: 11, marginTop: 3, fontFamily: 'SpaceGrotesk_600SemiBold' },
  needle: { width: 3, height: 190, position: 'absolute', borderRadius: 0 },
  needleCap: { width: 12, height: 12, borderRadius: 6, position: 'absolute', borderWidth: 2 },

  controls: { padding: 20 },
  primaryBtn: { borderRadius: radius.md, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontFamily: 'SpaceGrotesk_600SemiBold' },
  outlineBtn: { borderRadius: radius.md, paddingVertical: 15, alignItems: 'center', borderWidth: 1 },
  outlineBtnText: { fontSize: 15, fontFamily: 'SpaceGrotesk_500Medium' },
  locationCard: { borderRadius: radius.lg, padding: 16 },
  sectionLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1.5, marginBottom: 12 },
  notesInput: { borderRadius: radius.md },
});
