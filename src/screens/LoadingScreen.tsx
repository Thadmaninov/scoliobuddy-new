import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import AppLogo from '../components/AppLogo';
import { useLanguage } from '../contexts/LanguageContext';

const { width: W } = Dimensions.get('window');

interface LoadingScreenProps {
  navigation: any;
}

export default function LoadingScreen({ navigation }: LoadingScreenProps) {
  const { t } = useLanguage();

  const opacity    = useRef(new Animated.Value(0)).current;
  const logoY      = useRef(new Animated.Value(10)).current;
  const barWidth   = useRef(new Animated.Value(0)).current;
  const screenOp   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1 — content fades + lifts in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(logoY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // 2 — progress bar fills over 1.8s
    Animated.timing(barWidth, {
      toValue: W - 48,
      duration: 1800,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();

    // 3 — fade to black, then navigate
    const timer = setTimeout(() => {
      Animated.timing(screenOp, {
        toValue: 0,
        duration: 400,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(() => navigation.replace('Instructions'));
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: screenOp }]}>
      <Animated.View style={[styles.center, { opacity, transform: [{ translateY: logoY }] }]}>
        <AppLogo size={52} color="#ffffff" accentColor="#4a7fd4" />
        <Text style={styles.name}>ScolioBuddy</Text>
      </Animated.View>

      {/* Progress bar — bottom of screen */}
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { width: barWidth }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#030609',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 20,
  },
  name: {
    fontSize: 24,
    color: '#8aabcc',
    fontFamily: 'SpaceGrotesk_300Light',
    letterSpacing: 7,
    textTransform: 'uppercase',
  },
  barTrack: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  barFill: {
    height: 1,
    backgroundColor: 'rgba(37,99,235,0.6)',
  },
});
