import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../utils/theme';

export default function SettingsScreen() {
  const { t } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          {t('settings.select_language').toUpperCase()}
        </Text>
        <LanguageSelector />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 20 },
  section: { marginBottom: 24, gap: 10 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 1.5,
  },
});
