import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { verifyCode } from '../services/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/VerificationScreenStyles';

export default function VerificationScreen({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      Alert.alert('Código inválido', 'Por favor, ingresa el código de 6 dígitos.');
      return;
    }

    try {
      setLoading(true);
      const isValid = await verifyCode(email, code);

      if (isValid) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert('Código incorrecto', 'Verifica el código que te enviamos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al verificar el código.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#A020F0', '#800080']}
        style={styles.backgroundGradient}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Verifica tu correo</Text>
        <Text style={styles.subtitle}>Hemos enviado un código de 6 dígitos a {email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad" // Usar number-pad para solo números
          maxLength={6}
          textAlign={'center'}
          placeholderTextColor="#8E8E93"
        />

         {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: hp('3%') }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verificar Código</Text>
          </TouchableOpacity>
         )}
      </View>
    </KeyboardAvoidingView>
  );
}
