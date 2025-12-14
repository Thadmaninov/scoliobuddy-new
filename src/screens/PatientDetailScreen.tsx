import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, FAB, Card, Avatar, Divider, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { patientStorage } from '../utils/storage';
import { Patient, Measurement } from '../types';

interface PatientDetailScreenProps {
  navigation: any;
  route: any;
}

export default function PatientDetailScreen({ navigation, route }: PatientDetailScreenProps) {
  const theme = useTheme();
  const { patientId } = route.params;
  const [patient, setPatient] = useState<Patient | null>(null);

  const loadPatient = async () => {
    const data = await patientStorage.getPatient(patientId);
    setPatient(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadPatient();
    }, [patientId])
  );

  const renderMeasurement = ({ item }: { item: Measurement }) => (
    <Card style={styles.measurementCard}>
      <Card.Content>
        <View style={styles.measurementHeader}>
          <Text variant="titleMedium" style={[styles.angleText, { color: theme.colors.accent }]}>
            {item.angle}°
          </Text>
          <Text variant="bodySmall" style={[styles.dateText, { color: theme.colors.textSecondary }]}>
            {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <Text variant="bodyMedium" style={[styles.locationText, { color: theme.colors.onSurface }]}>
          Location: {item.location}
        </Text>
        {item.notes && (
          <Text variant="bodySmall" style={[styles.notesText, { color: theme.colors.textSecondary }]}>
            Notes: {item.notes}
          </Text>
        )}
      </Card.Content>
    </Card>
  );

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        {patient.profilePicture ? (
          <Image source={{ uri: patient.profilePicture }} style={styles.avatar} />
        ) : (
          <Avatar.Text
            size={80}
            label={patient.name.substring(0, 2).toUpperCase()}
            style={styles.avatar}
          />
        )}
        <Text variant="headlineSmall" style={[styles.patientName, { color: theme.colors.onPrimary }]}>
          {patient.name}
        </Text>
        <Text variant="bodyMedium" style={[styles.patientDOB, { color: theme.colors.onPrimary }]}>
          DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.measurementsSection}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Measurement History ({patient.measurements.length})
        </Text>
        {patient.measurements.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text variant="bodyMedium" style={styles.emptyText}>
              No measurements yet
            </Text>
            <Text variant="bodySmall" style={styles.emptySubtext}>
              Tap the + button to add a measurement
            </Text>
          </View>
        ) : (
          <FlatList
            data={[...patient.measurements].reverse()}
            renderItem={renderMeasurement}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      <FAB
        icon="plus"
        label="Add Measurement"
        style={[styles.fab, { backgroundColor: theme.colors.accent }]}
        color="#FFFFFF"
        onPress={() => navigation.navigate('Measurement', { patientId: patient.id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 10,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  patientName: {
    fontWeight: 'bold',
    fontFamily: 'KumbhSans_700Bold',
  },
  patientDOB: {
    marginTop: 5,
    fontFamily: 'KumbhSans_400Regular',
  },
  measurementsSection: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'KumbhSans_600SemiBold',
  },
  list: {
    paddingBottom: 80,
  },
  measurementCard: {
    marginBottom: 10,
  },
  measurementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  angleText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'KumbhSans_700Bold',
  },
  dateText: {
    fontFamily: 'KumbhSans_400Regular',
  },
  divider: {
    marginVertical: 10,
  },
  locationText: {
    marginBottom: 5,
    fontFamily: 'KumbhSans_400Regular',
  },
  notesText: {
    fontStyle: 'italic',
    fontFamily: 'KumbhSans_400Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginBottom: 5,
    fontFamily: 'KumbhSans_400Regular',
  },
  emptySubtext: {
    fontFamily: 'KumbhSans_400Regular',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
