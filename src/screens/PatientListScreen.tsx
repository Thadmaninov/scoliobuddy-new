import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { patientStorage } from '../utils/storage';
import { Patient } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme, radius } from '../utils/theme';
import { formatDate } from '../utils/date';

interface PatientListScreenProps {
  navigation: any;
}

export default function PatientListScreen({ navigation }: PatientListScreenProps) {
  const { t, locale } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [patients, setPatients] = useState<Patient[]>([]);

  useFocusEffect(useCallback(() => {
    patientStorage.getAllPatients().then(setPatients);
  }, []));

  const cardBg = isDark ? '#0f2744' : '#ffffff';
  const accent = '#1a4fa0';

  const renderPatient = ({ item, index }: { item: Patient; index: number }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBg }]}
      onPress={() => navigation.navigate('PatientDetail', { patientId: item.id })}
      activeOpacity={0.75}
    >
      <View style={[styles.indexBadge, { backgroundColor: accent + '22' }]}>
        <Text style={[styles.indexNum, { color: accent }]}>{String(index + 1).padStart(2, '0')}</Text>
      </View>

      {item.profilePicture ? (
        <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatarCircle, { backgroundColor: accent }]}>
          <Text style={styles.avatarInitials}>{item.name.substring(0, 2).toUpperCase()}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.colors.onSurface }]}>{item.name}</Text>
        <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>
          {formatDate(item.dateOfBirth, locale, t('common.unknown_date'))}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.count, { color: accent }]}>{item.measurements.length}</Text>
        <Text style={[styles.countLabel, { color: theme.colors.textSecondary }]}>
          {item.measurements.length === 1 ? t('patients.count_one') : t('patients.count_other')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {patients.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyCircle, { borderColor: accent + '40' }]}>
            <Text style={[styles.emptyIcon, { color: accent }]}>—</Text>
          </View>
          <Text style={[styles.emptyTitle, { color: theme.colors.onBackground }]}>
            {t('patients.no_patients')}
          </Text>
          <Text style={[styles.emptyDesc, { color: theme.colors.textSecondary }]}>
            {t('patients.no_patients_desc')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={patients}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPatient')}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={['#1a4fa0', '#0f2f6e']}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.fabIcon}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 20, paddingBottom: 100, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  indexBadge: {
    width: 32, height: 32, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  indexNum: { fontSize: 12, fontFamily: 'SpaceGrotesk_700Bold' },
  avatar: { width: 48, height: 48, borderRadius: radius.md },
  avatarCircle: {
    width: 48, height: 48, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitials: { fontSize: 17, color: '#fff', fontFamily: 'SpaceGrotesk_700Bold' },
  info: { flex: 1, gap: 3 },
  name: { fontSize: 15, fontFamily: 'SpaceGrotesk_600SemiBold' },
  meta: { fontSize: 12, fontFamily: 'SpaceGrotesk_400Regular' },
  right: { alignItems: 'flex-end', gap: 2 },
  count: { fontSize: 22, fontFamily: 'SpaceGrotesk_700Bold' },
  countLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_400Regular' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  emptyCircle: {
    width: 72, height: 72, borderRadius: radius.md,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  emptyIcon: { fontSize: 28, fontFamily: 'SpaceGrotesk_300Light' },
  emptyTitle: { fontSize: 19, fontFamily: 'SpaceGrotesk_700Bold' },
  emptyDesc: { fontSize: 14, fontFamily: 'SpaceGrotesk_400Regular', textAlign: 'center', paddingHorizontal: 40 },
  fab: {
    position: 'absolute', right: 24, bottom: 32,
    width: 56, height: 56, borderRadius: radius.lg,
    shadowColor: '#1a4fa0', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35, shadowRadius: 8, elevation: 8,
  },
  fabGradient: {
    width: 56, height: 56, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  fabIcon: { fontSize: 28, color: '#fff', marginTop: -2 },
});
