import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ToggleThemeButton from '../components/ToggleThemeButton';

export default function SimuladorScreen() {
  const { theme } = useTheme();
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const simularInvestimento = () => {
    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setResultado('❌ Digite um valor válido.');
      return;
    }

    const retornoAnual = valorNumerico * 1.12;
    const retornoMensal = retornoAnual / 12;

    setResultado(
      `💰 Investindo R$ ${valorNumerico.toFixed(2)}, você teria aproximadamente:\n• R$ ${retornoAnual.toFixed(2)} ao ano\n• R$ ${retornoMensal.toFixed(2)} por mês`
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.title, { color: theme.text }]}>📈 Simulador de Investimento</Text>

      <View style={styles.card}>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Digite o valor (ex: 100.00)"
          placeholderTextColor={theme.placeholder}
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={setValor}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0055cc' : '#007bff' },
          ]}
          onPress={simularInvestimento}
        >
          <Text style={styles.buttonText}>▶️ Simular</Text>
        </Pressable>

        {resultado && <Text style={[styles.resultado, { color: theme.text }]}>{resultado}</Text>}
      </View>

      <ToggleThemeButton />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});