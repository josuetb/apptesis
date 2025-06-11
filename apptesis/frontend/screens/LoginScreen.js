import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { sendVerificationCode } from '../services/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email.endsWith('@puce.edu.ec')) {
      Alert.alert('Correo inválido', 'Debes usar un correo @puce.edu.ec');
      return;
    }

    try {
      setLoading(true);
      await sendVerificationCode(email);
      navigation.navigate('Verification', { email });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar el código.');
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
        <Image source={require('../assets/icon.jpg')} style={styles.logo} />
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Ingresa tu correo institucional para continuar</Text>

        <View style={styles.inputContainer}>
           <MaterialIcons name="email" size={wp('5%')} color="#8E8E93" style={styles.inputIcon} />
           <TextInput
            style={styles.input}
            placeholder="correo@puce.edu.ec"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#8E8E93"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#A020F0" style={{ marginTop: hp('3%') }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <Text style={styles.buttonText}>Enviar Código</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
