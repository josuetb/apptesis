import React from 'react';
import { View, Text, Button, Alert, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';

import styles from '../styles/RecursosScreenStyles';
import localPdf from '../assets/documentos/PUCE-protocolo.pdf'; 
import recursosImage from '../assets/documentos/Protocolo.jpg';  

export default function RecursosScreen() {
  
  const getLocalFileUri = async () => {
    const asset = Asset.fromModule(localPdf);
    await asset.downloadAsync();

    const fileUri = FileSystem.documentDirectory + 'PUCE-protocolo.pdf';
    await FileSystem.copyAsync({
      from: asset.localUri,
      to: fileUri,
    });

    return fileUri;
  };

  const handleDownload = async () => {
    try {
      const uri = await getLocalFileUri();

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede guardar sin permisos.');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);

      Alert.alert('Descarga completada', 'El archivo se guardó en la carpeta de descargas.');
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'No se pudo guardar el PDF. En Android, para guardar archivos es necesario usar un build personalizado.'
      );
    }
  };

  const handleShare = async () => {
    try {
      const uri = await getLocalFileUri();
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo compartir el PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recursos</Text>

      {/* Imagen agregada */}
      <Image
        source={recursosImage}
        style={{
          width: 250,
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />

      <Text style={styles.text}>
        Aquí puedes consultar las normas de convivencia, reglamentos, protocolos y otros recursos útiles.
      </Text>

      <View style={{ marginTop: 30, gap: 10 }}>
        <Button title="Descargar PDF" onPress={handleDownload} />
        <Button title="Compartir PDF" onPress={handleShare} />
      </View>
    </View>
  );
}
