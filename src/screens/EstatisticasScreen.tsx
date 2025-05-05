import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

interface Gasto {
  data: string;
  valor: number;
}

export default function EstatisticasScreen() {
  const { theme } = useTheme();
  const [historico, setHistorico] = useState<Gasto[]>([]);
  const [mensagemVisivel, setMensagemVisivel] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('historicoGastos');
      if (data) {
        setHistorico(JSON.parse(data));
      }
    };
    load();

    const timer = setTimeout(() => setMensagemVisivel(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const limparHistorico = () => {
    Alert.alert('Confirmar', 'Deseja apagar todo o histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('historicoGastos');
          setHistorico([]);
        },
      },
    ]);
  };

  const labels = historico.slice(-7).map((item) => item.data);
  const valores = historico.slice(-7).map((item) => item.valor);

  const mediaSemanal = (
    valores.reduce((acc, val) => acc + val, 0) / (valores.length || 1)
  ).toFixed(2);

  const mediaMensal = (
    historico.reduce((acc, h) => acc + h.valor, 0) / (historico.length || 1)
  ).toFixed(2);

  const chartConfig = {
    backgroundGradientFrom: theme.background,
    backgroundGradientTo: theme.background,
    decimalPlaces: 2,
    color: () => theme.text,
    labelColor: () => theme.text,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: theme.text,
    },
    propsForBackgroundLines: {
      stroke: '#ccc',
    },
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {mensagemVisivel && (
        <Text style={[styles.mensagem, { color: theme.text }]}>Esta é a tela de detalhes.</Text>
      )}

      <Text style={[styles.title, { color: theme.text }]}>Estatísticas de Gastos</Text>

      <View style={styles.card}>
        <Text style={[styles.text, { color: theme.text }]}>📅 Média semanal: R$ {mediaSemanal}</Text>
        <Text style={[styles.text, { color: theme.text }]}>📆 Média geral (mensal): R$ {mediaMensal}</Text>
      </View>

      {valores.length > 0 ? (
        <>
          <Text style={[styles.chartTitle, { color: theme.text }]}>📈 Gráfico de Linha</Text>
          <LineChart
            data={{ labels, datasets: [{ data: valores }] }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel="R$ "
            yAxisSuffix=""
            fromZero
            chartConfig={chartConfig}
            style={styles.chart}
          />

          <Text style={[styles.chartTitle, { color: theme.text }]}>📊 Gráfico de Barras</Text>
          <BarChart
            data={{ labels, datasets: [{ data: valores }] }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel="R$ "
            yAxisSuffix=""
            fromZero
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </>
      ) : (
        <Text style={[styles.text, { color: theme.text, marginTop: 30 }]}>Nenhum dado disponível.</Text>
      )}

      <Pressable style={styles.button} onPress={limparHistorico}>
        <Text style={styles.buttonText}>🗑️ Limpar histórico</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  mensagem: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
