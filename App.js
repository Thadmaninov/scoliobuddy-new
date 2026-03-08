import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, KumbhSans_400Regular, KumbhSans_600SemiBold, KumbhSans_700Bold } from '@expo-google-fonts/kumbh-sans';

// i18n
import './src/i18n';
import { LanguageProvider } from './src/contexts/LanguageContext';

// Theme
import { professionalTheme } from './src/utils/theme';

// Components
import CustomDrawer from './src/components/CustomDrawer';

// Screens
import LoadingScreen from './src/screens/LoadingScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';
import PatientListScreen from './src/screens/PatientListScreen';
import AddPatientScreen from './src/screens/AddPatientScreen';
import PatientDetailScreen from './src/screens/PatientDetailScreen';
import MeasurementScreen from './src/screens/MeasurementScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator for main screens
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: professionalTheme.colors.primary,
        },
        headerTintColor: professionalTheme.colors.onPrimary,
        headerTitleStyle: {
          fontFamily: 'KumbhSans_600SemiBold',
          fontSize: 18,
        },
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="PatientList"
        component={PatientListScreen}
        options={{
          title: 'Patient Records',
          drawerLabel: 'Patients',
        }}
      />
      <Drawer.Screen
        name="Instructions"
        component={InstructionsScreen}
        options={{
          title: 'How to Use',
          drawerLabel: 'Instructions',
        }}
      />
    </Drawer.Navigator>
  );
}

// Main Stack Navigator
export default function App() {
  let [fontsLoaded] = useFonts({
    KumbhSans_400Regular,
    KumbhSans_600SemiBold,
    KumbhSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <PaperProvider theme={professionalTheme}>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              initialRouteName="Loading"
              screenOptions={{
                headerStyle: {
                  backgroundColor: professionalTheme.colors.primary,
                },
                headerTintColor: professionalTheme.colors.onPrimary,
                headerTitleStyle: {
                  fontFamily: 'KumbhSans_600SemiBold',
                  fontSize: 18,
                },
              }}
            >
              {/* Loading Screen - No Header */}
              <Stack.Screen
                name="Loading"
                component={LoadingScreen}
                options={{ headerShown: false }}
              />

              {/* Main App with Drawer - No Header (Drawer has its own) */}
              <Stack.Screen
                name="Main"
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />

              {/* Modal Screens - These appear on top with their own headers */}
              <Stack.Screen
                name="AddPatient"
                component={AddPatientScreen}
                options={{
                  title: 'New Patient',
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="PatientDetail"
                component={PatientDetailScreen}
                options={{ title: 'Patient Details' }}
              />
              <Stack.Screen
                name="Measurement"
                component={MeasurementScreen}
                options={{ title: 'Scoliometer Measurement' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
