import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function CharacterListScreen() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [inputPage, setInputPage] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // 🔄 Busca todos os personagens de todas as páginas
  const fetchAllCharacters = async () => {
    try {
      let all: Character[] = [];
      let nextUrl = 'https://rickandmortyapi.com/api/character';

      while (nextUrl) {
        const res = await fetch(nextUrl);
        const data = await res.json();
        all = [...all, ...data.results];
        nextUrl = data.info.next;
      }

      const ordered = all.sort((a, b) => a.name.localeCompare(b.name));
      setAllCharacters(ordered);
      setTotalPages(Math.ceil(ordered.length / 20)); // paginação local (20 por página)
      applySearch(ordered, search, page);
    } catch (err) {
      console.error('Erro ao buscar todos os personagens:', err);
    }
  };

  // 🔍 Aplica a busca e paginação local
  const applySearch = (data: Character[], query: string, page: number) => {
    let filtered = data;

    if (query) {
      filtered = data.filter((char) => {
        if (query.startsWith('*')) {
          return char.name.toLowerCase().includes(query.slice(1).toLowerCase());
        } else {
          return char.name.toLowerCase().startsWith(query.toLowerCase());
        }
      });
    }

    const startIndex = (page - 1) * 20;
    const paginated = filtered.slice(startIndex, startIndex + 20);

    setFilteredCharacters(paginated);
    setTotalPages(Math.ceil(filtered.length / 20));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    applySearch(allCharacters, value, 1);
  };

  const loadFavorites = async () => {
    const json = await AsyncStorage.getItem('favorites');
    if (json) setFavorites(JSON.parse(json));
  };

  const toggleFavorite = async (id: number) => {
    let updated = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  useEffect(() => {
    applySearch(allCharacters, search, page);
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛸 Rick and Morty</Text>

      <Text style={styles.pageInfo}>
        Página {page} de {totalPages}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="numeric"
          value={inputPage}
          onChangeText={setInputPage}
          style={styles.input}
          placeholder="insira o número da página"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={() => setPage(Number(inputPage))} style={styles.button}>
          <Text style={styles.buttonText}>Ir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favoritos' as never)} style={styles.button}>
          <Text style={styles.buttonText}>⭐ Favoritos</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder='Buscar personagem (ex: Rick ou *rick)'
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={handleSearchChange}
      />

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Text style={styles.star}>{favorites.includes(item.id) ? '🌟' : '☆'}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#eee' }}>Nenhum personagem encontrado.</Text>}
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
    color: '#52e3c2',
    textAlign: 'center',
    marginBottom: 6
  },
  pageInfo: {
    marginBottom: 10,
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 2,
    borderColor: '#52e3c2',
    padding: 6,
    width: 180,
    color: 'white',
    borderRadius: 6,
    marginRight: 10
  },
  button: {
    backgroundColor: '#52e3c2',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 8
  },
  buttonText: {
    color: '#1e1f26',
    fontWeight: 'bold'
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#ffcc00',
    backgroundColor: '#2b2c38',
    color: 'white',
    padding: 8,
    marginBottom: 14,
    borderRadius: 8
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
  star: {
    fontSize: 28,
    color: '#ffcc00'
  }
});
