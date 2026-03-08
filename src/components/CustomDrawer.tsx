import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, List, Divider, useTheme, Avatar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

export default function CustomDrawer(props: any) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { changeLanguage, availableLanguages, currentLanguage } = useLanguage();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* App Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={[styles.logoContainer, { borderColor: theme.colors.secondary }]}>
          <View style={[styles.logoInner, { backgroundColor: theme.colors.secondary }]}>
            <Text style={styles.logoText}>SB</Text>
          </View>
        </View>
        <Text
          variant="headlineSmall"
          style={[styles.headerText, { color: theme.colors.onPrimary }]}
        >
          {t('app_name')}
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.headerSubtext, { color: theme.colors.onPrimary }]}
        >
          {t('app_subtitle')}
        </Text>
      </View>

      {/* Navigation Items */}
      <List.Section>
        <List.Item
          title={t('patients.title')}
          description={t('patients.add_patient')}
          left={(props) => <List.Icon {...props} icon="account-group" color={theme.colors.primary} />}
          onPress={() => props.navigation.navigate('PatientList')}
          titleStyle={{
            color: theme.colors.onSurface,
            fontFamily: 'KumbhSans_600SemiBold'
          }}
          descriptionStyle={{
            color: theme.colors.onSurfaceVariant,
            fontFamily: 'KumbhSans_400Regular'
          }}
        />

        <List.Item
          title={t('instructions.title')}
          description="How to use the app"
          left={(props) => <List.Icon {...props} icon="information" color={theme.colors.primary} />}
          onPress={() => props.navigation.navigate('Instructions')}
          titleStyle={{
            color: theme.colors.onSurface,
            fontFamily: 'KumbhSans_600SemiBold'
          }}
          descriptionStyle={{
            color: theme.colors.onSurfaceVariant,
            fontFamily: 'KumbhSans_400Regular'
          }}
        />
      </List.Section>

      <Divider style={styles.divider} />

      {/* Language Selector Section */}
      <List.Section>
        <List.Subheader
          style={{
            color: theme.colors.primary,
            fontFamily: 'KumbhSans_600SemiBold',
            fontSize: 14
          }}
        >
          🌍 {t('settings.select_language')}
        </List.Subheader>

        {availableLanguages.map((language) => (
          <List.Item
            key={language.code}
            title={language.name}
            onPress={() => changeLanguage(language.code)}
            left={(props) => (
              <List.Icon
                {...props}
                icon={currentLanguage === language.code ? 'check-circle' : 'circle-outline'}
                color={currentLanguage === language.code ? theme.colors.primary : theme.colors.onSurfaceVariant}
              />
            )}
            right={() =>
              currentLanguage === language.code ? (
                <View style={[styles.activeBadge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.badgeText}>Active</Text>
                </View>
              ) : null
            }
            titleStyle={{
              color: currentLanguage === language.code ? theme.colors.primary : theme.colors.onSurface,
              fontFamily: currentLanguage === language.code ? 'KumbhSans_600SemiBold' : 'KumbhSans_400Regular',
            }}
            style={currentLanguage === language.code ? { backgroundColor: theme.colors.primaryContainer } : {}}
          />
        ))}
      </List.Section>

      <Divider style={styles.divider} />

      {/* Footer */}
      <View style={styles.footer}>
        <Text
          variant="bodySmall"
          style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}
        >
          Version 1.0.0
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}
        >
          Professional Scoliometer Tool
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'KumbhSans_700Bold',
    letterSpacing: 1,
  },
  headerText: {
    fontFamily: 'KumbhSans_700Bold',
    marginBottom: 5,
  },
  headerSubtext: {
    fontFamily: 'KumbhSans_400Regular',
    textAlign: 'center',
    opacity: 0.9,
  },
  divider: {
    marginVertical: 10,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'KumbhSans_600SemiBold',
  },
  footer: {
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'KumbhSans_400Regular',
    fontSize: 12,
    marginBottom: 4,
  },
});
