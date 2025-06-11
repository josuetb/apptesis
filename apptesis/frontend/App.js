import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import VerificationScreen from './screens/VerificationScreen';
import MainTabs from './screens/MainTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
