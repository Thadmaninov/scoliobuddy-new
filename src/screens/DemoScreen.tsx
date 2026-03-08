import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

/**
 * SUPER SIMPLE DEMO SCREEN
 *
 * This shows how easy it is to create a multi-language screen!
 * Just 3 steps:
 *
 * 1. Import useTranslation hook
 * 2. Add const { t } = useTranslation()
 * 3. Use t('key') for all text
 */

export default function DemoScreen() {
  // Step 1 & 2: Import and use the translation hook
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Step 3: Use t() for all text - automatically shows in correct language! */}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            {t('app_name')}
          </Text>

          <Text variant="bodyLarge" style={styles.subtitle}>
            {t('app_subtitle')}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">
            {t('instructions.title')}
          </Text>

          <Text variant="bodyMedium" style={styles.step}>
            • {t('instructions.step1_title')}
          </Text>
          <Text variant="bodyMedium" style={styles.step}>
            • {t('instructions.step2_title')}
          </Text>
          <Text variant="bodyMedium" style={styles.step}>
            • {t('instructions.step3_title')}
          </Text>
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.button}>
        {t('instructions.get_started')}
      </Button>

      {/*
        That's it!
        - Switch to Thai: Shows ไทย text
        - Switch to Chinese: Shows 中文 text
        - Switch to English: Shows English text

        No extra code needed!
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A1628',
  },
  card: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.8,
  },
  step: {
    marginTop: 8,
  },
  button: {
    marginTop: 20,
  },
});
