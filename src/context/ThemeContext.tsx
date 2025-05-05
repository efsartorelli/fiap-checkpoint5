import React, { createContext, useContext, useState } from 'react';

const lightTheme = {
  mode: 'light',
  background: '#ffffff',
  text: '#000000',
  placeholder: '#888888',
};

const darkTheme = {
  mode: 'dark',
  background: '#121212',
  text: '#ffffff',
  placeholder: '#aaaaaa',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
