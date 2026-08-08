import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme, radius } from '../utils/theme';

interface InstructionsScreenProps {
  navigation: any;
}

const STEPS = [
  { num: '01', accent: '#1a4fa0' },
  { num: '02', accent: '#1a5fa0' },
  { num: '03', accent: '#1a6faa' },
  { num: '04', accent: '#1a7fbb' },
];

export default function InstructionsScreen({ navigation }: InstructionsScreenProps) {
  const { t } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const cardBg = isDark ? '#0f2744' : '#ffffff';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={['#0a1628', '#0f2744']} style={styles.topBanner}>
        <Text style={styles.bannerTitle}>{t('instructions.title')}</Text>
        <Text style={styles.bannerSub}>{t('instructions.subtitle')}</Text>
      </LinearGradient>

      <View style={styles.steps}>
        {STEPS.map((step, i) => (
          <View key={i} style={[styles.card, { backgroundColor: cardBg }]}>
            <View style={[styles.numBadge, { backgroundColor: step.accent }]}>
              <Text style={styles.numText}>{step.num}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.stepTitle, { color: theme.colors.onSurface }]}>
                {t(`instructions.step${i + 1}_title`)}
              </Text>
              <Text style={[styles.stepDesc, { color: theme.colors.textSecondary }]}>
                {t(`instructions.step${i + 1}_desc`)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.replace('PatientList')}>
          <LinearGradient colors={['#1a4fa0', '#0f2f6e']} style={styles.primaryBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.primaryText}>{t('instructions.get_started')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('PatientList')} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>{t('instructions.skip')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBanner: { paddingTop: 36, paddingBottom: 32, paddingHorizontal: 24, gap: 6 },
  bannerTitle: { fontSize: 26, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold' },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'SpaceGrotesk_400Regular' },
  steps: { padding: 20, gap: 12 },
  card: {
    flexDirection: 'row', borderRadius: radius.lg, padding: 18, gap: 16, alignItems: 'flex-start',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1,
  },
  numBadge: {
    width: 42, height: 42, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  numText: { color: '#fff', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  cardText: { flex: 1, gap: 6 },
  stepTitle: { fontSize: 15, fontFamily: 'SpaceGrotesk_600SemiBold' },
  stepDesc: { fontSize: 13, fontFamily: 'SpaceGrotesk_400Regular', lineHeight: 20 },
  actions: { paddingHorizontal: 20, gap: 12 },
  primaryBtn: { borderRadius: radius.md, paddingVertical: 17, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold' },
  skipBtn: { alignItems: 'center', paddingVertical: 12 },
  skipText: { fontSize: 14, fontFamily: 'SpaceGrotesk_400Regular' },
});
