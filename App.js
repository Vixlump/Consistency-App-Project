import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/firebase';



// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TodayScreen from './src/screens/TodayScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import LocationPickerScreen from './src/screens/LocationPickerScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import MapCameraScreen from './src/screens/MapCameraScreen';
import MapLogEditScreen from './src/screens/MapLogEditScreen';
import MapUploadConfirmScreen from './src/screens/MapUploadConfirmScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import HomeActive from './assets/icons/home-active.svg';
import HomeInactive from './assets/icons/home-inactive.svg';

function MainTabs() {
  // load Inter font
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null; // prevent render until fonts are ready

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          let iconName;

          if (route.name === 'Today') {
            iconName = focused ? 'today' : 'today-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Navigator initialRouteName="Map"> */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddHabit"
            component={AddHabitScreen}
            options={{ title: 'Add New Habit' }}
          />
          <Stack.Screen
            name="LocationPicker"
            component={LocationPickerScreen}
            options={{ title: 'Select Location' }}
          />


          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapCamera"
            component={MapCameraScreen}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',   // <- not a sheet
              contentStyle: { backgroundColor: 'black' }, // prevent any peek-through
            }}
          />
          <Stack.Screen
            name="MapLogEdit"
            component={MapLogEditScreen}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',   // <- not a sheet
              contentStyle: { backgroundColor: 'black' }, // prevent any peek-through
            }} />
          <Stack.Screen
            name="MapUploadConfirm"
            component={MapUploadConfirmScreen}
            options={{ headerShown: false, presentation: 'containedModal' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});