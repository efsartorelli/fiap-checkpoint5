import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SimuladorScreen from '../screens/SimuladorScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import EstatisticasScreen from '../screens/EstatisticasScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          title: 'Início',
        }}
      />
      <Stack.Screen
        name="Simulador"
        component={SimuladorScreen}
        options={{ title: 'Simulador' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
      <Stack.Screen
        name="Estatisticas"
        component={EstatisticasScreen}
        options={{ title: 'Estatísticas' }}
      />
    </Stack.Navigator>
  );
}
