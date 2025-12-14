import AsyncStorage from '@react-native-async-storage/async-storage';
import { Patient, Measurement } from '../types';

const PATIENTS_KEY = '@scoliobuddy_patients';

export const patientStorage = {
  async getAllPatients(): Promise<Patient[]> {
    try {
      const data = await AsyncStorage.getItem(PATIENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting patients:', error);
      return [];
    }
  },

  async getPatient(id: string): Promise<Patient | null> {
    try {
      const patients = await this.getAllPatients();
      return patients.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Error getting patient:', error);
      return null;
    }
  },

  async savePatient(patient: Patient): Promise<void> {
    try {
      const patients = await this.getAllPatients();
      const index = patients.findIndex(p => p.id === patient.id);

      if (index >= 0) {
        patients[index] = patient;
      } else {
        patients.push(patient);
      }

      await AsyncStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
    } catch (error) {
      console.error('Error saving patient:', error);
      throw error;
    }
  },

  async deletePatient(id: string): Promise<void> {
    try {
      const patients = await this.getAllPatients();
      const filtered = patients.filter(p => p.id !== id);
      await AsyncStorage.setItem(PATIENTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  },

  async addMeasurement(patientId: string, measurement: Measurement): Promise<void> {
    try {
      const patient = await this.getPatient(patientId);
      if (!patient) throw new Error('Patient not found');

      patient.measurements.push(measurement);
      await this.savePatient(patient);
    } catch (error) {
      console.error('Error adding measurement:', error);
      throw error;
    }
  },
};
