import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={[styles.button, { backgroundColor: theme.text }]}>
        <Text style={{ color: theme.background }}>
          {theme.mode === 'light' ? '🌙' : '☀️'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    elevation: 4,
  },
});
