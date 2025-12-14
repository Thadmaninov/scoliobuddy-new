import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

interface LoadingScreenProps {
  navigation: any;
}

export default function LoadingScreen({ navigation }: LoadingScreenProps) {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Instructions');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Logo Circle */}
      <View style={[styles.logoContainer, { borderColor: theme.colors.secondary }]}>
        <View style={[styles.logoInner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.logoText, { fontFamily: 'KumbhSans_700Bold' }]}>
            SB
          </Text>
        </View>
      </View>

      {/* App Title */}
      <Text
        variant="headlineLarge"
        style={[styles.title, {
          color: theme.colors.onBackground,
          fontFamily: 'KumbhSans_700Bold'
        }]}
      >
        ScolioBuddy
      </Text>

      {/* Subtitle */}
      <Text
        variant="titleMedium"
        style={[styles.subtitle, {
          color: theme.colors.textSecondary,
          fontFamily: 'KumbhSans_400Regular'
        }]}
      >
        Professional Scoliometer Assessment
      </Text>

      {/* Loading Indicator */}
      <ActivityIndicator
        size="large"
        color={theme.colors.secondary}
        style={styles.loader}
      />

      {/* Version */}
      <Text
        variant="bodySmall"
        style={[styles.version, {
          color: theme.colors.textSecondary,
          fontFamily: 'KumbhSans_400Regular'
        }]}
      >
        Version 1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  title: {
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  loader: {
    marginTop: 20,
  },
  version: {
    position: 'absolute',
    bottom: 40,
  },
});
