import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/OrientacionScreenStyles';

export default function OrientacionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Necesito orientación</Text>
      <Text style={styles.text}>
        Si no estás seguro si debes denunciar, o si es un tema externo a la universidad, aquí podemos ayudarte.
      </Text>
      {/* Aqui puede ir opciones de contacto o mas info */}
    </View>
  );
}
