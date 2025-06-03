import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import HomeScreen from './HomeScreen';
import ReportarScreen from './ReportarScreen';
import RecursosScreen from './RecursosScreen';
import PerfilScreen from './PerfilScreen'; // La creamos después

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF', // Color iOS
        tabBarInactiveTintColor: '#8E8E93', // Color iOS
        tabBarStyle: { 
          height: Platform.OS === 'ios' ? hp('10%') : hp('8%'),
          paddingBottom: Platform.OS === 'ios' ? hp('3.5%') : hp('1%'),
          paddingTop: Platform.OS === 'ios' ? hp('1%') : 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Blanco con 95% de opacidad
          borderTopLeftRadius: 20, // Borde redondeado superior izquierdo
          borderTopRightRadius: 20, // Borde redondeado superior derecho
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
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={wp('5%')} color={color} />
          ),
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
        }}
      />
      <Tab.Screen
        name="Reportar"
        component={ReportarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="error-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recursos"
        component={RecursosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={wp('5%')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={wp('5%')} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
