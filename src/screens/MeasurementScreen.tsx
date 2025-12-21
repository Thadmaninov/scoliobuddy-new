import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button, TextInput, SegmentedButtons, useTheme } from 'react-native-paper';
import { DeviceMotion } from 'expo-sensors';
import { patientStorage } from '../utils/storage';
import { Measurement } from '../types';
import MeasurementInstructions from '../components/MeasurementInstructions';

interface MeasurementScreenProps {
  navigation: any;
  route: any;
}

export default function MeasurementScreen({ navigation, route }: MeasurementScreenProps) {
  const theme = useTheme();
  const { patientId } = route.params;
  const [angle, setAngle] = useState(0);
  const [location, setLocation] = useState('thoracic');
  const [notes, setNotes] = useState('');
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [calibrationOffset, setCalibrationOffset] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    startSensor();
    return () => {
      stopSensor();
    };
  }, [calibrationOffset]);

  const startSensor = async () => {
    try {
      await DeviceMotion.setUpdateInterval(100);
      const sub = DeviceMotion.addListener((data) => {
        if (data.rotation) {
          // Calculate angle from device rotation
          // Using gamma (left-right tilt) for scoliometer measurements
          const rawAngle = Math.abs(data.rotation.gamma * (180 / Math.PI));
          const calibratedAngle = Math.abs(rawAngle - calibrationOffset);
          setAngle(parseFloat(calibratedAngle.toFixed(1)));
        }
      });
      setSubscription(sub);
    } catch (error) {
      Alert.alert('Error', 'Failed to access device sensors');
    }
  };

  const stopSensor = () => {
    subscription?.remove();
    setSubscription(null);
  };

  const handleCalibrate = () => {
    setCalibrationOffset(angle);
    setIsCalibrated(true);
    Alert.alert('Calibrated', 'Device calibrated to current position (0°)');
  };

  const handleStartMeasure = () => {
    if (!isCalibrated) {
      Alert.alert('Calibration Required', 'Please calibrate the device first');
      return;
    }
    setIsMeasuring(true);
  };

  const handleSave = async () => {
    if (!isCalibrated) {
      Alert.alert('Error', 'Please calibrate the device first');
      return;
    }

    if (!isMeasuring) {
      Alert.alert('Error', 'Please start measurement first');
      return;
    }

    try {
      const measurement: Measurement = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        angle: angle,
        location: location === 'thoracic' ? 'Thoracic' : location === 'lumbar' ? 'Lumbar' : 'Cervical',
        notes: notes.trim() || undefined,
      };

      await patientStorage.addMeasurement(patientId, measurement);

      Alert.alert('Success', 'Measurement saved successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save measurement');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Angle Display */}
      <View style={[styles.angleCard, { backgroundColor: theme.colors.surface }]}>
        <Text
          variant="displayLarge"
          style={[styles.angleText, {
            color: theme.colors.secondary,
            fontFamily: 'KumbhSans_700Bold',
            paddingTop:20
          }]}
        >
          {angle}°
        </Text>
        {!isCalibrated && (
          <Text variant="bodyMedium" style={[styles.statusText, { color: theme.colors.error }]}>
            Not Calibrated
          </Text>
        )}
        {isMeasuring && (
          <Text variant="bodyMedium" style={[styles.statusText, { color: '#10b981' }]}>
            Measuring...
          </Text>
        )}
      </View>

      {/* Visual Indicator */}
      <View style={styles.visualContainer}>
        <View style={[styles.visualIndicator]}>
          <View
            style={[
              styles.tiltLine,
              { backgroundColor: 'white', transform: [{ rotate: `${angle}deg` }] }
            ]}
          />
        </View>
      </View>

      <View style={styles.controls}>
        {!isCalibrated ? (
          <Button
            mode="contained"
            onPress={handleCalibrate}
            style={styles.button}
            icon="crosshairs-gps"
          >
            Calibrate Device (Set to 0°)
          </Button>
        ) : !isMeasuring ? (
          <>
            <Button
              mode="contained"
              onPress={handleStartMeasure}
              style={styles.button}
              icon="play"
            >
              Start Measurement
            </Button>
            <Button
              mode="outlined"
              onPress={handleCalibrate}
              style={styles.button}
              icon="refresh"
            >
              Recalibrate
            </Button>
          </>
        ) : (
          <>
            <Text
              variant="titleMedium"
              style={[styles.label, {
                color: theme.colors.onBackground,
                fontFamily: 'KumbhSans_600SemiBold'
              }]}
            >
              Select Spinal Location
            </Text>
            <SegmentedButtons
              value={location}
              onValueChange={(value) => {
                setLocation(value);
                setShowInstructions(true);
              }}
              buttons={[
                { value: 'thoracic', label: 'Thoracic' },
                { value: 'lumbar', label: 'Lumbar' },
                { value: 'cervical', label: 'Cervical' },
              ]}
              style={styles.segmented}
            />

            {/* Instructions Section */}
            {showInstructions && (
              <>
                <Button
                  mode="text"
                  onPress={() => setShowInstructions(!showInstructions)}
                  style={styles.toggleButton}
                >
                  {showInstructions ? 'Hide' : 'Show'} Instructions
                </Button>
                <MeasurementInstructions location={location} />
              </>
            )}

            <TextInput
              label="Additional Notes (Optional)"
              value={notes}
              onChangeText={setNotes}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
              textColor={theme.colors.onBackground}
            />

            <Button
              mode="contained"
              onPress={handleSave}
              style={[styles.button]}
              icon="content-save"
              textColor="#FFFFFF"
            >
              Save Measurement ({angle}°)
            </Button>

            <Button
              mode="outlined"
              onPress={() => setIsMeasuring(false)}
              style={styles.button}
            >
              Cancel
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  angleCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    marginTop: 20,
  },
  angleText: {
    fontSize: 72,
    letterSpacing: 2,
  },
  statusText: {
    marginTop: 8,
    fontFamily: 'KumbhSans_600SemiBold',
  },
  visualContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  visualIndicator: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 90,
    borderWidth: 3,
  },
  tiltLine: {
    width: 4,
    height: 140,
  },
  controls: {
    padding: 20,
  },
  label: {
    marginBottom: 12,
    marginTop: 8,
  },
  segmented: {
    marginBottom: 16,
  },
  toggleButton: {
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
    marginTop: 8,
  },
  button: {
    marginBottom: 12,
    borderRadius: 8,
  },
});
