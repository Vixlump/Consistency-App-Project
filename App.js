// import 'react-native-gesture-handler';
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { ActivityIndicator } from 'react-native-paper';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
// import { Text } from 'react-native';
// import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './src/utils/firebase';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';



// // Import Screens
// import LoginScreen from './src/screens/LoginScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
// import TodayScreen from './src/screens/TodayScreen';
// import RewardsScreen from './src/screens/RewardsScreen';
// import StatsScreen from './src/screens/StatsScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
// import AddHabitScreen from './src/screens/AddHabitScreen';
// import LocationPickerScreen from './src/screens/LocationPickerScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import MapScreen from './src/screens/MapScreen';
// import LogsMapScreen from './src/screens/LogsMapScreen';
// import MapCameraScreen from './src/screens/MapCameraScreen';
// import MapUploadConfirmScreen from './src/screens/MapUploadConfirmScreen';
// import MapLogEditScreen from './src/screens/MapLogEditScreen';
// import MapLogDetailScreen from './src/screens/MapLogDetailScreen.js';
// import CreateHabitScreen from './src/screens/CreateHabitScreen';

// import HabitDetailScreen from './src/screens/HabitDetailScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// import HomeActive from './assets/icons/Home-icon-active.png';
// import HomeInactive from './assets/icons/Home-icon-inactive.png';

// function MainTabs() {
//   // load Inter font
//   const [fontsLoaded] = useFonts({
//     Inter_400Regular,
//     Inter_600SemiBold,
//   });

//   if (!fontsLoaded) return null; // prevent render until fonts are ready

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {

//           let iconName;

//           if (route.name === 'Today') {
//             iconName = focused ? 'today' : 'today-outline';
//           } else if (route.name === 'Rewards') {
//             iconName = focused ? 'trophy' : 'trophy-outline';
//           } else if (route.name === 'Stats') {
//             iconName = focused ? 'stats-chart' : 'stats-chart-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#6366f1',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="Today" component={TodayScreen} />
//       <Tab.Screen name="Rewards" component={RewardsScreen} />
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Stats" component={StatsScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {

//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const subscriber = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       if (initializing) setInitializing(false);
//     });
//     return subscriber; // unsubscribe on unmount
//   }, [initializing]);

//   if (initializing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6366f1" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             {/* <Stack.Navigator initialRouteName="Map"> */}
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="SignUp"
//               component={SignUpScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Main"
//               component={MainTabs}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="AddHabit"
//               component={AddHabitScreen}
//               options={{ title: 'Add New Habit' }}
//             />
//             <Stack.Screen
//               name="LocationPicker"
//               component={LocationPickerScreen}
//               options={{ title: 'Select Location' }}
//             />


//             <Stack.Screen
//               name="Map"
//               component={LogsMapScreen}
//               options={{ headerShown: false }}
//             />

//             {/* <Stack.Screen
//             name="LogsMap"
//             component={LogsMapScreen}
//             options={{ headerShown: false }}
//           /> */}
//             <Stack.Screen
//               name="MapCamera"
//               component={MapCameraScreen}
//               options={{
//                 headerShown: false,
//                 presentation: 'fullScreenModal',   // <- not a sheet
//                 contentStyle: { backgroundColor: 'black' }, // prevent any peek-through
//               }}
//             />
//             <Stack.Screen
//               name="MapLogEdit"
//               component={MapLogEditScreen}
//               options={{
//                 headerShown: false,
//                 presentation: 'fullScreenModal',   // <- not a sheet
//                 contentStyle: { backgroundColor: 'black' }, // prevent any peek-through
//               }} />
//             <Stack.Screen
//               name="MapUploadConfirm"
//               component={MapUploadConfirmScreen}
//               options={{ headerShown: false, presentation: 'containedModal' }}
//             />
//             <Stack.Screen
//               name="MapLogDetail"
//               component={MapLogDetailScreen}
//               options={{ headerShown: false, presentation: 'containedModal' }}
//             />

//             <Stack.Screen
//               name="CreateHabit"
//               component={CreateHabitScreen}
//               options={{
//                 headerShown: false,
//                 presentation: 'modal'
//               }}
//             />

//             <Stack.Screen
//               name="HabitDetail"
//               component={HabitDetailScreen}
//               options={{
//                 presentation: 'modal', // This makes it slide up like the screenshot
//                 headerShown: false
//               }}
//             />

//           </Stack.Navigator>
//         </NavigationContainer>
//       </GestureHandlerRootView>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });


import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/utils/ThemeContext';

//Import Screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import LocationPickerScreen from './src/screens/LocationPickerScreen';
import HomeScreen from './src/screens/HomeScreen';
import LogsMapScreen from './src/screens/LogsMapScreen';
import MapCameraScreen from './src/screens/MapCameraScreen';
import MapUploadConfirmScreen from './src/screens/MapUploadConfirmScreen';
import MapLogEditScreen from './src/screens/MapLogEditScreen';
import MapLogDetailScreen from './src/screens/MapLogDetailScreen.js';
import CreateHabitScreen from './src/screens/CreateHabitScreen';
import HabitDetailScreen from './src/screens/HabitDetailScreen';
import SurveyScreen from './src/screens/SurveyScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <Tab.Navigator
      initialRouteName="Home" // <-- Set Home as the default landing tab
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // <-- Hides the text labels (Map, Rewards, etc.)
        tabBarStyle: {
          backgroundColor: '#000000', // Black background
          borderTopColor: '#333333',
          height: 90,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FFFFFF', // White active color
        tabBarInactiveTintColor: '#666666', // Gray inactive color
      })}
    >
      {/* 1. Map Tab */}
      <Tab.Screen
        name="Map"
        component={LogsMapScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            // Uses filled "map" when focused
            <Ionicons name={focused ? "map" : "map-outline"} size={24} color={color} />
          )
        }}
      />

      {/* 2. Rewards Tab */}
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            // Uses FontAwesome6 Trophy. 
            // Note: Size 24 is standard for tabs. 12 is very small, but you can change it if needed.
            // <FontAwesome6 name="trophy" size={24} color={color} />
            // <Ionicons name="trophy-outline" size={24} color={color} />
            <Ionicons name={focused ? "trophy" : "trophy-outline"} size={26} color={color} />
          )
        }}
      />

      {/* 3. Home Tab (Image Icon) */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image
                source={focused
                  ? require('./assets/icons/Home-icon-active.png')
                  : require('./assets/icons/Home-icon-inactive.png')
                }
                // Using the size from your snippet
                style={{ width: 100, height: 80 }}
                resizeMode="contain"
              />
            </View>
          )
        }}
      />

      {/* 4. Overview Tab (Was Stats) */}
      <Tab.Screen
        name="Overview"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            // Uses Ionicons Grid
            <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
          )
        }}
      />

      {/* 5. Settings Tab */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            // Uses filled "settings" when focused
            // <Ionicons name="settings" size={24} color={color} />
            // <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
            <MaterialCommunityIcons name={focused ? "account" : "account-outline"} size={28} color={color} />

          )
        }}
      />
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
    return subscriber;
  }, [initializing]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

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

              {/* Main App Tabs */}
              <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{ headerShown: false }}
              />

              {/* Helper Screens */}
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
                name="MapCamera"
                component={MapCameraScreen}
                options={{
                  headerShown: false,
                  presentation: 'fullScreenModal',
                  contentStyle: { backgroundColor: 'black' },
                }}
              />
              <Stack.Screen
                name="MapLogEdit"
                component={MapLogEditScreen}
                options={{
                  headerShown: false,
                  presentation: 'fullScreenModal',
                  contentStyle: { backgroundColor: 'black' },
                }}
              />
              <Stack.Screen
                name="MapUploadConfirm"
                component={MapUploadConfirmScreen}
                options={{ headerShown: false, presentation: 'containedModal' }}
              />
              <Stack.Screen
                name="MapLogDetail"
                component={MapLogDetailScreen}
                options={{ headerShown: false, presentation: 'containedModal' }}
              />
              <Stack.Screen
                name="CreateHabit"
                component={CreateHabitScreen}
                options={{
                  headerShown: false,
                  presentation: 'modal'
                }}
              />
              <Stack.Screen
                name="HabitDetail"
                component={HabitDetailScreen}
                options={{
                  presentation: 'modal',
                  headerShown: false
                }}
              />
              <Stack.Screen name="Survey" component={SurveyScreen} />

            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
        <StatusBar style="light" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});