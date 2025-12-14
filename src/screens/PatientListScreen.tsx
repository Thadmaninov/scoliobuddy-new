import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, FAB, Card, Avatar, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { patientStorage } from '../utils/storage';
import { Patient } from '../types';
import { professionalTheme } from '../utils/theme'

interface PatientListScreenProps {
  navigation: any;
}

export default function PatientListScreen({ navigation }: PatientListScreenProps) {
  const theme = useTheme();
  const [patients, setPatients] = useState<Patient[]>([]);

  const loadPatients = async () => {
    const data = await patientStorage.getAllPatients();
    setPatients(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadPatients();
    }, [])
  );

  const renderPatient = ({ item }: { item: Patient }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('PatientDetail', { patientId: item.id })}
    >
      <Card.Content style={styles.cardContent}>
        {item.profilePicture ? (
          <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
        ) : (
          <Avatar.Text
            size={60}
            label={item.name.substring(0, 2).toUpperCase()}
            style={styles.avatar}
          />
        )}
        <View style={styles.patientInfo}>
          <Text variant="titleMedium" style={styles.patientName}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.patientDOB}>
            DOB: {new Date(item.dateOfBirth).toLocaleDateString()}
          </Text>
          <Text variant="bodySmall" style={styles.measurementCount}>
            {item.measurements.length} measurement{item.measurements.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {patients.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="titleLarge" style={[styles.emptyText, { color: professionalTheme.colors.textSecondary}]}>
            No Patients Yet
          </Text>
          <Text variant="bodyMedium" style={[styles.emptySubtext, { color: professionalTheme.colors.textSecondary }]}>
            Tap the + button to add your first patient
          </Text>
        </View>
      ) : (
        <FlatList
          data={patients}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      <FAB
        icon="plus"
        style={[styles.fab]}
        color={professionalTheme.colors.primary}
        onPress={() => navigation.navigate('AddPatient')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 15,
  },
  card: {
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 15,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontWeight: 'bold',
    fontFamily: 'KumbhSans_600SemiBold',
  },
  patientDOB: {
    marginTop: 4,
    fontFamily: 'KumbhSans_400Regular',
  },
  measurementCount: {
    marginTop: 4,
    fontFamily: 'KumbhSans_400Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginBottom: 10,
    fontFamily: 'KumbhSans_600SemiBold',
  },
  emptySubtext: {
    fontFamily: 'KumbhSans_400Regular',
  },
  fab: {
    backgroundColor:'white',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
