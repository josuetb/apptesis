import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/RecursosScreenStyles';

export default function RecursosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 Recursos</Text>
      <Text style={styles.text}>
        Aquí puedes consultar las normas de convivencia, reglamentos, protocolos y otros recursos útiles.
      </Text>
      {/* Puedes agregar enlaces a PDF, documentos, etc. */}
    </View>
  );
} 