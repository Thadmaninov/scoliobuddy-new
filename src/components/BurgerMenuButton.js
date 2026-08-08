import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSidebar } from '../contexts/SidebarContext';

export default function BurgerMenuButton() {
  const { openSidebar } = useSidebar();

  return (
    <TouchableOpacity
      onPress={openSidebar}
      style={styles.button}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <View style={styles.line} />
      <View style={[styles.line, { width: 16 }]} />
      <View style={styles.line} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 16,
    justifyContent: 'center',
    gap: 5,
  },
  line: {
    width: 22,
    height: 2,
    backgroundColor: '#ffffff',
  },
});
