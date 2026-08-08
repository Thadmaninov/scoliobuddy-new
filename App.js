import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

import './src/i18n';

import { LanguageProvider, useLanguage } from './src/contexts/LanguageContext';
import { SidebarProvider } from './src/contexts/SidebarContext';
import { ThemeProvider, useAppTheme } from './src/contexts/ThemeContext';
import { darkTheme, lightTheme } from './src/utils/theme';

import Sidebar from './src/components/Sidebar';
import BurgerMenuButton from './src/components/BurgerMenuButton';
import HomeButton from './src/components/HomeButton';

import LoadingScreen from './src/screens/LoadingScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';
import PatientListScreen from './src/screens/PatientListScreen';
import AddPatientScreen from './src/screens/AddPatientScreen';
import PatientDetailScreen from './src/screens/PatientDetailScreen';
import MeasurementScreen from './src/screens/MeasurementScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { isDark } = useAppTheme();
  // Consuming the language context here re-renders the navigator — and with it
  // every header title below — the moment the language changes.
  const { t } = useLanguage();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={{
              headerStyle: { backgroundColor: '#040810', elevation: 0, shadowOpacity: 0 },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontFamily: 'SpaceGrotesk_600SemiBold',
                fontSize: 17,
                color: '#ffffff',
              },
              headerLeft: () => <BurgerMenuButton />,
              cardStyle: { backgroundColor: theme.colors.background },
            }}
          >
            <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Instructions" component={InstructionsScreen} options={{ title: t('nav.instructions') }} />
            <Stack.Screen name="PatientList" component={PatientListScreen} options={{ title: t('nav.patients') }} />
            <Stack.Screen name="AddPatient" component={AddPatientScreen}
              options={({ navigation }) => ({
                title: t('nav.add_patient'),
                headerRight: () => <HomeButton navigation={navigation} />,
              })}
            />
            <Stack.Screen name="PatientDetail" component={PatientDetailScreen}
              options={({ navigation }) => ({
                title: t('nav.patient_detail'),
                headerRight: () => <HomeButton navigation={navigation} />,
              })}
            />
            <Stack.Screen name="Measurement" component={MeasurementScreen}
              options={({ navigation }) => ({
                title: t('nav.measurement'),
                headerRight: () => <HomeButton navigation={navigation} />,
              })}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('nav.settings') }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Sidebar />
      </View>
    </PaperProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <SidebarProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator />
          </GestureHandlerRootView>
        </SidebarProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
