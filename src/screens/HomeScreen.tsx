import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<HomeNavigationProp>();
  const { logout } = useAuth();

  const [gasto, setGasto] = useState<number>(0);
  const [historico, setHistorico] = useState<{ data: string; valor: number }[]>([]);

  useEffect(() => {
    const gerarGasto = async () => {
      const novoGasto = Math.floor(Math.random() * 500 + 100);
      await AsyncStorage.setItem('gastoSemana', novoGasto.toString());
      setGasto(novoGasto);

      const dados = await AsyncStorage.getItem('historicoGastos');
      const historicoSalvo = dados ? JSON.parse(dados) : [];

      const hoje = new Date();
      const novos = Array.from({ length: 6 }).map((_, i) => {
        const dia = new Date(hoje);
        dia.setDate(hoje.getDate() - i);
        return {
          data: dia.toLocaleDateString(),
          valor: Math.floor(Math.random() * 500 + 100),
        };
      });

      const atualizado = [...historicoSalvo, ...novos];
      await AsyncStorage.setItem('historicoGastos', JSON.stringify(atualizado));
      setHistorico(atualizado);
    };

    gerarGasto();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>📊 Resumo da Semana</Text>

      <View style={styles.card}>
        <Text style={[styles.cardText, { color: theme.text }]}>
          💸 Você apostou R$ {gasto} esta semana.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardText, { color: theme.text }]}>
          💡 Considere investir esse valor em algo que te traga mais retorno e felicidade.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Simulador')}>
        <Text style={styles.buttonText}>📈 Simular Investimento</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>👤 Seu Perfil</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Estatisticas')}>
        <Text style={styles.buttonText}>📑 Ver Detalhes</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.logout]}
        onPress={async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
        }}
      >
        <Text style={styles.buttonText}>🚪 Sair</Text>
      </Pressable>

      <Text style={[styles.title, { color: theme.text, marginTop: 30 }]}>🕓 Histórico</Text>
      {historico.slice(-5).reverse().map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={[styles.cardText, { color: theme.text }]}>
            📅 {item.data}: R$ {item.valor}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    flexGrow: 1,
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
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  logout: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
