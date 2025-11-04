import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from '../screens/MapScreen';
import MapCameraScreen from '../screens/MapCameraScreen';
import MapLogEditScreen from '../screens/MapLogEditScreen';
import MapUploadConfirmScreen from '../screens/MapUploadConfirmScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MapCamera" component={MapCameraScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="MapLogEdit" component={MapLogEditScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="MapUploadConfirm" component={MapUploadConfirmScreen} options={{ presentation: 'containedModal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
