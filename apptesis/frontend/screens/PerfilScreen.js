import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PerfilScreenStyles';

export default function PerfilScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Quieres cerrar sesión en este dispositivo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Si',
          style: 'destructive',
          onPress: () => {
            // Lógica para cerrar sesión aquí
            console.log('Cerrar sesión');
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={80} color="#007ACC" style={{ marginBottom: 10 }} />
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Aquí puedes hacer seguimiento de tus casos y encontrar ayuda u orientación.</Text>
      {/* Aquí puedes agregar más opciones, historial de reportes, etc. */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de denuncias</Text>
        <Text style={styles.sectionText}>Aquí aparecerán las denuncias que has realizado.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Necesitas ayuda?</Text>
        <Text style={styles.sectionText}>Contacta a Bienestar Estudiantil o revisa la sección de orientación.</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
} 