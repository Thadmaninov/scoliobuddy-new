import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { patientStorage } from '../utils/storage';
import { Patient, Measurement } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme, radius } from '../utils/theme';
import { formatDate, formatTime } from '../utils/date';

interface PatientDetailScreenProps {
  navigation: any;
  route: any;
}

export default function PatientDetailScreen({ navigation, route }: PatientDetailScreenProps) {
  const { t, locale } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { patientId } = route.params;
  const [patient, setPatient] = useState<Patient | null>(null);

  useFocusEffect(useCallback(() => {
    patientStorage.getPatient(patientId).then(setPatient);
  }, [patientId]));

  const cardBg = isDark ? '#060c18' : '#ffffff';
  const accent = '#1d4ed8';
  const deleteColor = isDark ? '#3a1a1a' : '#fee2e2';

  /** Region labels follow the active language for records that stored a key. */
  const regionLabel = (item: Measurement) =>
    item.locationKey ? t(`measurement.${item.locationKey}`) : item.location;

  const handleDeleteMeasurement = (item: Measurement) => {
    Alert.alert(
      t('patient_detail.delete_title'),
      t('patient_detail.delete_message', { angle: item.angle, location: regionLabel(item) }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            await patientStorage.deleteMeasurement(patientId, item.id);
            patientStorage.getPatient(patientId).then(setPatient);
          },
        },
      ]
    );
  };

  const renderMeasurement = ({ item, index }: { item: Measurement; index: number }) => (
    <View style={[styles.mCard, { backgroundColor: cardBg }]}>
      <View style={[styles.mLeft, { backgroundColor: accent }]}>
        <Text style={styles.mAngle}>{item.angle}</Text>
        <Text style={styles.mDeg}>°</Text>
      </View>
      <View style={styles.mBody}>
        <Text style={[styles.mLocation, { color: theme.colors.onSurface }]}>{regionLabel(item)}</Text>
        <Text style={[styles.mDate, { color: theme.colors.textSecondary }]}>
          {[formatDate(item.date, locale, t('common.unknown_date')), formatTime(item.date, locale, '')]
            .filter(Boolean)
            .join(' · ')}
        </Text>
        {item.notes ? (
          <Text style={[styles.mNotes, { color: theme.colors.textSecondary }]}>{item.notes}</Text>
        ) : null}
      </View>
      <View style={styles.mRight}>
        <Text style={[styles.mIndex, { color: isDark ? '#1a2e48' : '#c8d9f0' }]}>
          {String(index + 1).padStart(2, '0')}
        </Text>
        <TouchableOpacity
          style={[styles.mDelete, { backgroundColor: deleteColor }]}
          onPress={() => handleDeleteMeasurement(item)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.mDeleteText, { color: isDark ? '#f87171' : '#dc2626' }]}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!patient) return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={{ color: theme.colors.textSecondary, fontFamily: 'SpaceGrotesk_400Regular' }}>{t('loading')}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero header */}
      <LinearGradient colors={['#030508', '#060c18', '#0a1628']} style={styles.hero}>
        {patient.profilePicture ? (
          <Image source={{ uri: patient.profilePicture }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarCircle, { backgroundColor: accent }]}>
            <Text style={styles.avatarInitials}>{patient.name.substring(0, 2).toUpperCase()}</Text>
          </View>
        )}
        <Text style={styles.heroName}>{patient.name}</Text>
        <Text style={styles.heroDOB}>
          {t('patient_detail.dob')}: {formatDate(patient.dateOfBirth, locale, t('common.unknown_date'))}
        </Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>{patient.measurements.length}</Text>
            <Text style={styles.heroStatLabel}>
              {patient.measurements.length === 1 ? t('patients.count_one') : t('patients.count_other')}
            </Text>
          </View>
          {patient.measurements.length > 0 && (
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>
                {patient.measurements[patient.measurements.length - 1].angle}°
              </Text>
              <Text style={styles.heroStatLabel}>{t('common.latest')}</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Measurements */}
      <View style={styles.body}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          {t('patient_detail.history')}
        </Text>
        {patient.measurements.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>{t('patient_detail.no_measurements')}</Text>
            <Text style={[styles.emptyDesc, { color: theme.colors.textSecondary }]}>{t('patient_detail.no_measurements_desc')}</Text>
          </View>
        ) : (
          <FlatList
            data={[...patient.measurements].reverse()}
            renderItem={renderMeasurement}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10, paddingBottom: 110 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Measurement', { patientId: patient.id })}
        activeOpacity={0.85}
      >
        <LinearGradient colors={['#1d4ed8', '#1034a6']} style={styles.fabGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.fabText}>+ {t('patient_detail.add_measurement')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    paddingTop: 28, paddingBottom: 28, paddingHorizontal: 24, alignItems: 'center', gap: 6,
  },
  avatar: { width: 76, height: 76, borderRadius: radius.lg, marginBottom: 8 },
  avatarCircle: { width: 76, height: 76, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  avatarInitials: { fontSize: 28, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold' },
  heroName: { fontSize: 24, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold' },
  heroDOB: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'SpaceGrotesk_400Regular' },
  heroStats: { flexDirection: 'row', gap: 32, marginTop: 16 },
  heroStat: { alignItems: 'center' },
  heroStatNum: { fontSize: 28, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold' },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'SpaceGrotesk_400Regular', textTransform: 'uppercase', letterSpacing: 1 },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14, opacity: 0.6 },
  mCard: {
    flexDirection: 'row', borderRadius: radius.lg, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1,
  },
  mLeft: { width: 72, alignItems: 'center', justifyContent: 'center', padding: 16, flexDirection: 'row' },
  mAngle: { fontSize: 28, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold' },
  mDeg: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'SpaceGrotesk_400Regular', alignSelf: 'flex-start', marginTop: 6 },
  mBody: { flex: 1, padding: 14, gap: 4 },
  mLocation: { fontSize: 15, fontFamily: 'SpaceGrotesk_600SemiBold' },
  mDate: { fontSize: 12, fontFamily: 'SpaceGrotesk_400Regular' },
  mNotes: { fontSize: 12, fontFamily: 'SpaceGrotesk_400Regular', fontStyle: 'italic' },
  mRight: { alignItems: 'center', justifyContent: 'center', paddingRight: 10, gap: 6 },
  mIndex: { fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold' },
  mDelete: {
    width: 36, height: 36, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginRight: 10,
  },
  mDeleteText: { fontSize: 22, fontFamily: 'SpaceGrotesk_300Light', lineHeight: 26 },
  empty: { alignItems: 'center', marginTop: 60, gap: 8 },
  emptyText: { fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium' },
  emptyDesc: { fontSize: 13, fontFamily: 'SpaceGrotesk_400Regular', textAlign: 'center' },
  fab: {
    position: 'absolute', left: 20, right: 20, bottom: 28, borderRadius: radius.md,
    shadowColor: '#1a4fa0', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 8,
  },
  fabGradient: { borderRadius: radius.md, paddingVertical: 16, alignItems: 'center' },
  fabText: { color: '#fff', fontSize: 15, fontFamily: 'SpaceGrotesk_600SemiBold' },
});
