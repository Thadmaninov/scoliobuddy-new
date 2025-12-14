import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';


interface InstructionsScreenProps {
  navigation: any;
}

export default function InstructionsScreen({ navigation }: InstructionsScreenProps) {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.stepTitle,]}>
              Step 1: Add a Patient
            </Text>
            <Text variant="bodyMedium" style={{ fontFamily: 'KumbhSans_400Regular' }}>
              Start by adding a patient profile with their name, date of birth, and optional profile picture.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.stepTitle]}>
              Step 2: Perform Measurement
            </Text>
            <Text variant="bodyMedium" style={{ fontFamily: 'KumbhSans_400Regular' }}>
              Select a patient and tap "Add Measurement". Use your 3D printed scoliometer with the phone to measure spinal curvature.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.stepTitle]}>
              Step 3: Position the Device
            </Text>
            <Text variant="bodyMedium" style={{ fontFamily: 'KumbhSans_400Regular' }}>
              Place the phone in the scoliometer device and position it on the patient's back. The app will display the angle in real-time.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.stepTitle]}>
              Step 4: Save & Track
            </Text>
            <Text variant="bodyMedium" style={{ fontFamily: 'KumbhSans_400Regular' }}>
              Save the measurement to track progress over time. View history to compare previous measurements.
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => navigation.replace('PatientList')}
          style={styles.button}
        >
          Get Started
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.replace('PatientList')}
          style={styles.skipButton}
        >
          Skip Instructions
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'KumbhSans_700Bold',
  },
  card: {
    marginBottom: 15,
  },
  stepTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'KumbhSans_600SemiBold',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
  skipButton: {
    marginBottom: 20,
  },
});
