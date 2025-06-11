import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/NormasScreenStyles';

export default function NormasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Normas y derechos</Text>
      <Text style={styles.text}>
        Aquí puedes consultar las normas de convivencia, reglamentos y protocolos.
      </Text>
      {/* Para agregar enlaces a PDF */}
    </View>
  );
}
