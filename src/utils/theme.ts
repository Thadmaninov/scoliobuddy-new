import { MD3DarkTheme } from 'react-native-paper';

export const professionalTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1a2332', // Dark Navy Blue
    primaryContainer: '#0d1117',
    secondary: '#FFFFFF', // White
    secondaryContainer: '#f5f5f5',
    background: '#0d1117', // Very dark navy
    surface: '#1a2332',
    surfaceVariant: '#2d3748',
    error: '#ef4444',
    onPrimary: '#FFFFFF',
    onSecondary: '#1a2332',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#FFFFFF',
    // Additional professional colors
    accent: '#3b82f6', // Blue accent
    text: '#FFFFFF',
    textSecondary: '#9ca3af',
    border: '#374151',
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    default: {
      fontFamily: 'KumbhSans_400Regular',
    },
  },
};

export const fontConfig = {
  fontFamily: 'KumbhSans_400Regular',
};
