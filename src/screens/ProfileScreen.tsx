import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {welcomeVisible && (
        <Text style={styles.welcomeText}>👋 Bem-vindo ao seu perfil!</Text>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>👤 Nome:</Text>
        <Text style={styles.value}>João Silva</Text>

        <Text style={styles.label}>🎂 Idade:</Text>
        <Text style={styles.value}>28 anos</Text>

        <Text style={styles.label}>📧 Email:</Text>
        <Text style={styles.value}>joao.silva@example.com</Text>

        <Text style={styles.label}>🏙️ Cidade:</Text>
        <Text style={styles.value}>São Paulo, Brasil</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default ProfileScreen;
