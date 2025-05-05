import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('loggedIn').then((value) => {
      if (value === 'true') setIsLogged(true);
    });
  }, []);

  const login = async () => {
    await AsyncStorage.setItem('loggedIn', 'true');
    setIsLogged(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedIn');
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
