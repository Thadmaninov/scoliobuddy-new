import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme, List } from 'react-native-paper';

interface MeasurementInstructionsProps {
  location: string;
}

export default function MeasurementInstructions({ location }: MeasurementInstructionsProps) {
  const theme = useTheme();

  const thoracicInstructions = {
    title: 'Thoracic Spine Measurement',
    position: 'Upper/Mid Back (T1-T12)',
    steps: [
      'Have patient bend forward at the waist with arms hanging down',
      'Locate the apex of the curve in the upper/mid back region',
      'Place scoliometer across the back perpendicular to spine',
      'Ensure device is level with the ground',
      'Read the angle when patient is still and breathing normally',
    ],
    tips: [
      'Most common area for scoliosis curves',
      'Look for rib prominence (rib hump) on one side',
      'Normal reading: 0-5 degrees',
      'Mild: 5-7 degrees | Moderate: 7-10 degrees | Severe: >10 degrees',
    ],
  };

  const lumbarInstructions = {
    title: 'Lumbar Spine Measurement',
    position: 'Lower Back (L1-L5)',
    steps: [
      'Have patient bend forward at the waist with arms hanging down',
      'Locate the apex of the curve in the lower back region',
      'Place scoliometer across the back perpendicular to spine',
      'Ensure device is level with the ground',
      'Read the angle when patient is still and breathing normally',
    ],
    tips: [
      'Second most common area for curves',
      'Look for asymmetry in the lower back muscles',
      'Normal reading: 0-5 degrees',
      'May see prominence on one side of lower back',
    ],
  };

  const cervicalInstructions = {
    title: 'Cervical Spine Measurement',
    position: 'Neck Region (C1-C7)',
    steps: [
      'Have patient bend head and neck forward slightly',
      'Locate any curve in the neck region',
      'Place scoliometer across the neck/upper back',
      'Ensure device is level',
      'Read the angle when patient is still',
    ],
    tips: [
      'Less common measurement location',
      'Be gentle in this sensitive area',
      'Look for head tilt or shoulder height difference',
    ],
  };

  const currentInstructions =
    location === 'thoracic'
      ? thoracicInstructions
      : location === 'lumbar'
      ? lumbarInstructions
      : cervicalInstructions;

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, {
              color: theme.colors.onSurface,
              fontFamily: 'KumbhSans_700Bold'
            }]}
          >
            {currentInstructions.title}
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.position, {
              color: theme.colors.accent,
              fontFamily: 'KumbhSans_600SemiBold'
            }]}
          >
            📍 {currentInstructions.position}
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[styles.listTitle, {
              color: theme.colors.onSurface,
              fontFamily: 'KumbhSans_600SemiBold'
            }]}
          >
            Measurement Steps:
          </Text>
          {currentInstructions.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text
                variant="bodyMedium"
                style={[styles.stepNumber, {
                  color: theme.colors.accent,
                  fontFamily: 'KumbhSans_700Bold'
                }]}
              >
                {index + 1}.
              </Text>
              <Text
                variant="bodyMedium"
                style={[styles.stepText, {
                  color: theme.colors.onSurface,
                  fontFamily: 'KumbhSans_400Regular'
                }]}
              >
                {step}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[styles.listTitle, {
              color: theme.colors.onSurface,
              fontFamily: 'KumbhSans_600SemiBold'
            }]}
          >
            💡 Important Tips:
          </Text>
          {currentInstructions.tips.map((tip, index) => (
            <Text
              key={index}
              variant="bodySmall"
              style={[styles.tip, {
                color: theme.colors.textSecondary,
                fontFamily: 'KumbhSans_400Regular'
              }]}
            >
              • {tip}
            </Text>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  position: {
    marginTop: 4,
  },
  listTitle: {
    marginBottom: 12,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 8,
  },
  stepNumber: {
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    flex: 1,
    lineHeight: 20,
  },
  tip: {
    marginBottom: 6,
    lineHeight: 18,
  },
});
