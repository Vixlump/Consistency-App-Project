import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';

const themes = {
  dark: {
    type: 'dark',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    subText: '#9CA3AF',
    iconBg: '#3A3A3C',
    border: '#3A3A3C',
    danger: '#EF4444',
    statusBarStyle: 'light-content',
  },
  light: {
    type: 'light',
    background: '#F2F2F7', // Standard iOS light gray
    card: '#FFFFFF',
    text: '#000000',
    subText: '#6B7280',
    iconBg: '#E5E5EA',
    border: '#E5E5EA',
    danger: '#DC2626',
    statusBarStyle: 'dark-content',
  },
  midnight: {
    type: 'dark',
    background: '#0f172a', // Deep Blue
    card: '#1e293b', // Lighter Blue
    text: '#f8fafc',
    subText: '#94a3b8',
    iconBg: '#334155',
    border: '#334155',
    danger: '#f87171',
    statusBarStyle: 'light-content',
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('dark'); // Default to dark
  const theme = themes[themeName];

  // Load saved theme on startup
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('userTheme');
      if (savedTheme) setThemeName(savedTheme);
    };
    loadTheme();
  }, []);

  // Function to update theme and save it
  const updateTheme = async (newThemeName) => {
    setThemeName(newThemeName);
    await AsyncStorage.setItem('userTheme', newThemeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, updateTheme }}>
      <StatusBar barStyle={theme.statusBarStyle} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);