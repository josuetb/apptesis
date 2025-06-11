import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from './HomeScreen';
import ReportarScreen from './ReportarScreen';
import RecursosScreen from './RecursosScreen';
import PerfilScreen from './PerfilScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          position: 'absolute',
          height: hp('8%') + insets.bottom, // Altura dinámica con safe area
          paddingBottom: insets.bottom > 0 ? insets.bottom : hp('1.5%'),
          paddingTop: hp('0.5%'),
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0.5,
          borderColor: '#ccc',
        },
        tabBarLabelStyle: {
          fontSize: wp('2.8%'),
          fontWeight: '500',
          marginBottom: Platform.OS === 'ios' ? hp('0.5%') : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? hp('0.5%') : 0,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reportar"
        component={ReportarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="error-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recursos"
        component={RecursosScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
