import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const isFocused = useIsFocused();

  const loadFavorites = async () => {
    const json = await AsyncStorage.getItem('favorites');
    const favIds: number[] = json ? JSON.parse(json) : [];

    const data = await Promise.all(
      favIds.map(id =>
        fetch(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.json())
      )
    );
    setFavorites(data);
  };

  const removeFavorite = async (id: number) => {
    const updated = favorites.filter(char => char.id !== id);
    setFavorites(updated);
    const newIds = updated.map(char => char.id);
    await AsyncStorage.setItem('favorites', JSON.stringify(newIds));
  };

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Meus Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ color: '#ccc', textAlign: 'center', marginTop: 20 }}>
            Nenhum personagem favoritado ainda.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
              <Text style={styles.removeText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1f26',
    padding: 16
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#2a2f38',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#52e3c2',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  },
  removeText: {
    fontSize: 22,
    color: '#ff5555'
  }
});
