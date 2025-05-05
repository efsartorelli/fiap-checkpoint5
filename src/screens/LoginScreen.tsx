import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>🔐 Bem-vindo de volta!</Text>

      <View style={styles.card}>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="E-mail"
          placeholderTextColor={theme.placeholder}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Senha"
          placeholderTextColor={theme.placeholder}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0055cc' : '#007bff' },
          ]}
          onPress={() => {
            login();
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
          }}
        >
          <Text style={styles.buttonText}>➡️ Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
