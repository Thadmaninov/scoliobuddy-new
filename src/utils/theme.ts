import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const darkColors = {
  primary: '#060c18',
  primaryContainer: '#040810',
  secondary: '#1d4ed8',
  secondaryContainer: '#0c1a30',
  background: '#030508',
  surface: '#060c18',
  surfaceVariant: '#0c1a30',
  error: '#ef4444',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  onError: '#FFFFFF',
  accent: '#1d4ed8',
  text: '#FFFFFF',
  textSecondary: '#4a6888',
  border: '#0c1a30',
  card: '#060c18',
};

const lightColors = {
  primary: '#0f2744',
  primaryContainer: '#e6eeff',
  secondary: '#1a4fa0',
  secondaryContainer: '#dbeafe',
  background: '#f0f5ff',
  surface: '#ffffff',
  surfaceVariant: '#e6eeff',
  error: '#ef4444',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#0f2744',
  onSurface: '#0f2744',
  onError: '#FFFFFF',
  accent: '#1a4fa0',
  text: '#0f2744',
  textSecondary: '#3a5f8a',
  border: '#c8d9f0',
  card: '#ffffff',
};

/**
 * Corner radii. Deliberately tight — a clinical tool should read as
 * instrumentation, not as a consumer app. Nothing above `lg` except true
 * circles (the gauge).
 */
export const radius = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 6,
  xl: 8,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: { ...MD3DarkTheme.colors, ...darkColors },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, ...lightColors },
};

export const professionalTheme = darkTheme;

export const fontConfig = {
  fontFamily: 'SpaceGrotesk_400Regular',
};
