import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, KumbhSans_400Regular, KumbhSans_600SemiBold, KumbhSans_700Bold } from '@expo-google-fonts/kumbh-sans';

// Theme
import { professionalTheme } from './src/utils/theme';

// Screens
import LoadingScreen from './src/screens/LoadingScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';
import PatientListScreen from './src/screens/PatientListScreen';
import AddPatientScreen from './src/screens/AddPatientScreen';
import PatientDetailScreen from './src/screens/PatientDetailScreen';
import MeasurementScreen from './src/screens/MeasurementScreen';

const Stack = createStackNavigator();

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
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Instructions"
              component={InstructionsScreen}
              options={{ title: 'How to Use' }}
            />
            <Stack.Screen
              name="PatientList"
              component={PatientListScreen}
              options={{ title: 'Patient Records' }}
            />
            <Stack.Screen
              name="AddPatient"
              component={AddPatientScreen}
              options={{ title: 'New Patient' }}
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
    </GestureHandlerRootView>
  );
}
