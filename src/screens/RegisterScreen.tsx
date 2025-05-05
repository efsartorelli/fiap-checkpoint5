import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ToggleThemeButton from '../components/ToggleThemeButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    login();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>📝 Cadastro</Text>

      <View style={styles.card}>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="E-mail"
          placeholderTextColor={theme.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Senha"
          placeholderTextColor={theme.placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Confirmar Senha"
          placeholderTextColor={theme.placeholder}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0055cc' : '#007bff' },
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>✅ Cadastrar</Text>
        </Pressable>
      </View>

      <ToggleThemeButton />
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
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
