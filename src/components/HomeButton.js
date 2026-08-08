import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

function HouseIcon() {
  const s = '#ffffff';
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
      {/* roof */}
      <Path
        d="M8.5 2L15.5 8H13.5V15H3.5V8H1.5L8.5 2Z"
        stroke={s}
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="none"
      />
      {/* door */}
      <Rect x="6.25" y="10.5" width="4.5" height="4.5" rx="0.5" stroke={s} strokeWidth="1.1" fill="none" />
    </Svg>
  );
}

export default function HomeButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PatientList')}
      style={styles.btn}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      activeOpacity={0.6}
    >
      <HouseIcon />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 14,
    width: 32,
    height: 32,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
