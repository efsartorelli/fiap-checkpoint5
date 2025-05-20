import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharacterListScreen from '../screens/CharacterListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RickAndMorty"
        component={CharacterListScreen}
        options={{ title: 'Personagens' }}
      />
      <Stack.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
    </Stack.Navigator>
  );
}
