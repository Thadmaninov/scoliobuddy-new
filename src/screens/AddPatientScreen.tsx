import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Platform, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { patientStorage } from '../utils/storage';
import { formatDate } from '../utils/date';
import { Patient } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme, radius } from '../utils/theme';

interface AddPatientScreenProps {
  navigation: any;
}

export default function AddPatientScreen({ navigation }: AddPatientScreenProps) {
  const { t, locale } = useLanguage();
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!res.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) setProfilePicture(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const res = await ImagePicker.requestCameraPermissionsAsync();
    if (!res.granted) return;
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) setProfilePicture(result.assets[0].uri);
  };

  const handleImagePress = () => {
    Alert.alert(t('add_patient.select_photo'), '', [
      { text: t('add_patient.take_photo'), onPress: takePhoto },
      { text: t('add_patient.choose_library'), onPress: pickImage },
      { text: t('add_patient.cancel'), style: 'cancel' },
    ]);
  };

  /** Unambiguous, locale-independent form for persistence. */
  const toStorageDate = (date: Date) => {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${m}-${d}`;
  };

  const handleSave = async () => {
    if (!name.trim()) { Alert.alert('', t('add_patient.error_name')); return; }
    setLoading(true);
    try {
      const newPatient: Patient = {
        id: Date.now().toString(),
        name: name.trim(),
        dateOfBirth: toStorageDate(dateOfBirth),
        profilePicture,
        measurements: [],
        createdAt: new Date().toISOString(),
      };
      await patientStorage.savePatient(newPatient);
      Alert.alert('', t('add_patient.success'), [
        { text: t('common.ok'), onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert(t('common.error'), t('add_patient.error_save'));
    } finally {
      setLoading(false);
    }
  };

  const bg = theme.colors.background;
  const surface = isDark ? '#0f2744' : '#ffffff';
  const border = theme.colors.border;
  const text = theme.colors.onBackground;
  const muted = theme.colors.textSecondary;
  const accent = '#1a4fa0';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>

      {/* Avatar picker */}
      <TouchableOpacity onPress={handleImagePress} style={styles.avatarSection} activeOpacity={0.8}>
        <LinearGradient colors={['#0a1628', '#0f2744']} style={styles.avatarBg}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { borderColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.avatarPlaceholderText}>
                {t('add_patient.tap_add_photo').toUpperCase()}
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.form}>
        {/* Name field */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: muted }]}>
            {t('add_patient.full_name').toUpperCase()}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            mode="flat"
            style={[styles.input, { backgroundColor: surface }]}
            textColor={text}
            underlineColor="transparent"
            activeUnderlineColor={accent}
            placeholder={t('add_patient.name')}
            placeholderTextColor={muted}
          />
        </View>

        {/* DOB field */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: muted }]}>
            {t('add_patient.date_of_birth').toUpperCase()}
          </Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={[styles.dobRow, { backgroundColor: surface }]}>
              <Text style={[styles.dobText, { color: text }]}>
                {formatDate(dateOfBirth, locale)}
              </Text>
              <Text style={[styles.dobIcon, { color: muted }]}>▼</Text>
            </View>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, d) => {
              if (Platform.OS === 'android') setShowDatePicker(false);
              if (d) setDateOfBirth(d);
            }}
            maximumDate={new Date()}
            textColor="#ffffff"
            accentColor={accent}
          />
        )}

        {/* Save button */}
        <TouchableOpacity onPress={handleSave} disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
          <LinearGradient colors={['#1a4fa0', '#0f2f6e']} style={styles.saveBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.saveBtnText}>{loading ? '...' : t('add_patient.save')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.cancelBtn, { borderColor: border }]} disabled={loading}>
          <Text style={[styles.cancelText, { color: muted }]}>{t('add_patient.cancel')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarSection: { height: 220 },
  avatarBg: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 108, height: 108, borderRadius: radius.xl },
  avatarPlaceholder: {
    width: 108, height: 108, borderRadius: radius.xl,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  avatarPlaceholderText: {
    color: 'rgba(255,255,255,0.4)', fontSize: 11,
    fontFamily: 'SpaceGrotesk_600SemiBold', textAlign: 'center', letterSpacing: 1,
  },
  form: { padding: 24, gap: 20 },
  fieldGroup: { gap: 8 },
  fieldLabel: {
    fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1.5,
  },
  input: {
    borderRadius: radius.md, fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    paddingHorizontal: 0,
  },
  dobRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 16,
  },
  dobText: { fontSize: 16, fontFamily: 'SpaceGrotesk_400Regular' },
  dobIcon: { fontSize: 12 },
  saveBtn: { borderRadius: radius.md, paddingVertical: 17, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold' },
  cancelBtn: { borderRadius: radius.md, paddingVertical: 15, alignItems: 'center', borderWidth: 1 },
  cancelText: { fontSize: 15, fontFamily: 'SpaceGrotesk_500Medium' },
});
