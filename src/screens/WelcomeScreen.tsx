import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>🎯 Bem-vindo ao Aposta+</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#0055cc' : '#007bff',
            },
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>🔐 Já tenho conta</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#0055cc' : '#007bff',
            },
          ]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>🆕 Sou novo aqui</Text>
        </Pressable>
      </View>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
