import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, List, Divider, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@scoliobuddy_language';

export default function CustomDrawer(props: any) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'th', name: t('languages.th') },
    { code: 'ja', name: t('languages.ja') },
    { code: 'ar', name: t('languages.ar') },
    { code: 'zh', name: t('languages.zh') },
    { code: 'es', name: t('languages.es') },
    { code: 'fr', name: t('languages.fr') },
  ];

  const changeLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.background }}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text variant="headlineMedium" style={styles.headerText}>
          {t('app_name')}
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtext}>
          {t('app_subtitle')}
        </Text>
      </View>

      <List.Section>
        <List.Subheader style={{ color: theme.colors.onSurface }}>
          {t('settings.select_language')}
        </List.Subheader>
        {languages.map((language) => (
          <List.Item
            key={language.code}
            title={language.name}
            onPress={() => changeLanguage(language.code)}
            left={(props) => (
              <List.Icon
                {...props}
                icon={i18n.language === language.code ? 'check-circle' : 'circle-outline'}
                color={i18n.language === language.code ? theme.colors.primary : theme.colors.onSurface}
              />
            )}
            titleStyle={{
              color: theme.colors.onSurface,
              fontFamily: 'KumbhSans_400Regular'
            }}
          />
        ))}
      </List.Section>

      <Divider style={styles.divider} />

      <List.Item
        title={t('patients.title')}
        left={(props) => <List.Icon {...props} icon="account-group" />}
        onPress={() => props.navigation.navigate('PatientList')}
        titleStyle={{ color: theme.colors.onSurface }}
      />

      <List.Item
        title={t('instructions.title')}
        left={(props) => <List.Icon {...props} icon="information" />}
        onPress={() => props.navigation.navigate('Instructions')}
        titleStyle={{ color: theme.colors.onSurface }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginBottom: 10,
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
  },
  headerSubtext: {
    color: '#000',
    marginTop: 5,
  },
  divider: {
    marginVertical: 10,
  },
});
