import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bienestar y Seguridad Estudiantil</Text>
        <Text style={styles.subtitle}>Espacio confidencial para orientación, denuncia y apoyo</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <MaterialIcons name="security" size={wp('10%')} color="#007ACC" />
          <Text style={styles.infoTitle}>Confidencialidad</Text>
          <Text style={styles.infoText}>Tu información está protegida y es confidencial.</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons name="verified-user" size={wp('10%')} color="#007ACC" />
          <Text style={styles.infoTitle}>Proceso Seguro</Text>
          <Text style={styles.infoText}>Tu denuncia será manejada con procesos legales.</Text>
        </View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>¿Necesitas ayuda inmediata?</Text>
        <Text style={styles.contactText}>
          Contacta a Bienestar Estudiantil:
          {'\n'}📞 Teléfono: (02) 299-1700
          {'\n'}✉️ Email: bienestar@puce.edu.ec
        </Text>
      </View>
    </ScrollView>
  );
}
