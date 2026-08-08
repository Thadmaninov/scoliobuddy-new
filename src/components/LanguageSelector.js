import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme, radius } from '../utils/theme';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const accent = '#1a4fa0';

  return (
    <View style={[styles.list, { borderColor: theme.colors.border }]}>
      {availableLanguages.map((lang, i) => {
        const active = currentLanguage === lang.code;
        return (
          <TouchableOpacity
            key={lang.code}
            onPress={() => changeLanguage(lang.code)}
            activeOpacity={0.6}
            style={[
              styles.row,
              i < availableLanguages.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.colors.border,
              },
              active && { backgroundColor: accent + '14' },
            ]}
          >
            <Text style={[styles.abbr, { color: active ? accent : theme.colors.textSecondary }]}>
              {lang.abbr}
            </Text>
            <Text
              style={[
                styles.name,
                {
                  color: active ? theme.colors.onSurface : theme.colors.textSecondary,
                  fontFamily: active ? 'SpaceGrotesk_600SemiBold' : 'SpaceGrotesk_400Regular',
                },
              ]}
            >
              {lang.label}
            </Text>
            {active && <View style={[styles.dot, { backgroundColor: accent }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  abbr: { width: 30, fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold' },
  name: { flex: 1, fontSize: 14 },
  dot: { width: 5, height: 5, borderRadius: radius.xs },
});
