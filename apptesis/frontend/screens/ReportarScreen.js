import React, { useState } from 'react';
import { enviarDenuncia } from '../services/api';
import * as FileSystem from 'expo-file-system'; 
import {
  View, Text, TextInput, TouchableOpacity, Platform, Image, Alert, ScrollView, 
  Modal, FlatList, SafeAreaView, StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/ReportarScreenStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReportarScreen() {
  const [formData, setFormData] = useState({
    rol: '', nombres: '', apellidos: '', cedula: '', carrera: '', facultad: '',
    agresorPuce: '', nombreAgresor: '', correoAgresor: '', descripcionFisica: '',
    titulo: '', descripcion: '', fecha: new Date(), periodoAcademico: '',
    ubicacion: '', ubicacionExacta: '', tipoViolencia: '', tipoViolenciaOtro: '',
  });

  const [evidencias, setEvidencias] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalOptions, setModalOptions] = useState([]);

  const OPTIONS = {
    rol: [
      { label: 'Estudiante', value: 'estudiante' },
      { label: 'Docente', value: 'docente' },
      { label: 'Administrativo', value: 'administrativo' },
    ],
    agresorPuce: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
    tipoViolencia: [
      { label: 'Acoso', value: 'acoso' },
      { label: 'Discriminación', value: 'discriminacion' },
      { label: 'Intimidación', value: 'intimidacion' },
      { label: 'Acoso Sexual', value: 'acoso_sexual' },
      { label: 'Acoso Cibernético', value: 'acoso_cibernetico' },
      { label: 'Otro', value: 'otro' },
    ],
    periodoAcademico: [
      { label: '2025-01', value: '2025-01' },
      { label: '2025-02', value: '2025-02' },
      { label: '2024-01', value: '2024-01' },
      { label: '2024-02', value: '2024-02' },
    ],
  };

  const LABELS = {
    rol: { estudiante: 'Estudiante', docente: 'Docente', administrativo: 'Administrativo' },
    agresorPuce: { si: 'Sí', no: 'No' },
    tipoViolencia: {
      acoso: 'Acoso', discriminacion: 'Discriminación', intimidacion: 'Intimidación',
      acoso_sexual: 'Acoso Sexual', acoso_cibernetico: 'Acoso Cibernético', otro: 'Otro'
    },
  };

  const updateFormData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      if (selectedDate > new Date()) {
        Alert.alert('Fecha inválida', 'No puedes seleccionar una fecha futura.');
        return;
      }
      updateFormData('fecha', selectedDate);
    }
    setShowDatePicker(false);
  };

  const showOptionsModal = (type) => {
    setModalOptions(OPTIONS[type]);
    setModalType(type);
    setShowModal(true);
  };

  const handleOptionSelect = (value) => {
    updateFormData(modalType, value);
    setShowModal(false);
  };


const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permiso denegado', 'Se necesita acceso a la galería.');
    }

    if (evidencias.length >= 5) {
      return Alert.alert('Límite alcanzado', 'Solo puedes subir hasta 5 archivos.');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const fileUri = asset.uri;

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      const fileSizeInMB = fileInfo.size ? fileInfo.size / (1024 * 1024) : 0;

      if (fileSizeInMB > 30) {
        return Alert.alert('Archivo demasiado grande', 'El archivo debe ser menor a 30 MB.');
      }

      // Inferir tipo MIME por la extensión del archivo
      const fileName = fileUri.split('/').pop();
      const extension = fileName.split('.').pop().toLowerCase();

      const mimeMap = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        mp4: 'video/mp4',
        mov: 'video/quicktime',
        avi: 'video/x-msvideo',
        webm: 'video/webm',
      };

      const mimeType = mimeMap[extension];

      if (!mimeType || (!mimeType.startsWith('image') && !mimeType.startsWith('video'))) {
        return Alert.alert('Tipo de archivo no permitido', 'Solo se permiten imágenes y videos.');
      }

      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const evidencia = {
        uri: fileUri,
        mime: mimeType,
        nombre: fileName,
        base64: base64, // puro, sin el "data:<mime>;base64,"
      };

      setEvidencias(prev => [...prev, evidencia]);
    }
  } catch (err) {
    console.error('Error al seleccionar archivo:', err);
    Alert.alert('Error', 'No se pudo seleccionar el archivo.');
  }
};
  const removeEvidencia = (index) => setEvidencias(prev => prev.filter((_, i) => i !== index));

 const handleSubmit = async () => {
  const required = ['rol', 'nombres', 'apellidos', 'cedula', 'carrera', 'facultad'];
  if (formData.agresorPuce === 'si') {
    required.push('tipoViolencia', 'periodoAcademico', 'fecha', 'titulo', 'descripcion');
  }
  if (formData.tipoViolencia === 'otro' && !formData.tipoViolenciaOtro) {
    required.push('tipoViolenciaOtro');
  }

  const missing = required.filter(f => !formData[f]);
  if (missing.length > 0) {
    return Alert.alert('Campos incompletos', `Completa: ${missing.join(', ')}`);
  }

  try {
    // Convertir imágenes/videos a base64
    const base64Evidencias = evidencias.map(e => ({
        base64: e.base64,
        nombre: e.nombre,
        mime: e.mime,
      }));


    const payload = {
      ...formData,
      fecha: formData.fecha.toISOString(),
      evidencias: base64Evidencias,
    };

    await enviarDenuncia(payload);

    Alert.alert('Denuncia enviada correctamente');
    setFormData({ ...formData, titulo: '', descripcion: '', ubicacion: '', ubicacionExacta: '' });
    setEvidencias([]);
  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'No se pudo enviar la denuncia.');
  }
};


  const renderIcon = (iconName, iconSet) => {
    const IconComponent = { MaterialIcons, Ionicons, FontAwesome5 }[iconSet];
    return <IconComponent name={iconName} size={wp('5%')} color="#007AFF" />;
  };

  const renderSection = (title, children, iconName, iconSet) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        {renderIcon(iconName, iconSet)}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  const renderOptionButton = (type, value, placeholder = 'Seleccione una opción') => (
    <TouchableOpacity style={styles.optionButton} onPress={() => showOptionsModal(type)}>
      <Text style={styles.optionButtonText}>
        {value && LABELS[type] ? LABELS[type][value] : value || placeholder}
      </Text>
      <MaterialIcons name="chevron-right" size={wp('6%')} color="#8E8E93" />
    </TouchableOpacity>
  );

  const renderTextInput = (field, placeholder, props = {}) => (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={formData[field]}
      onChangeText={(text) => updateFormData(field, text)}
      {...props}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitle}>Reportar un incidente</Text>
        </View>

        {renderSection('Información Personal', (
          <>
            {renderOptionButton('rol', formData.rol, 'Rol')}
            {renderTextInput('nombres', 'Nombres')}
            {renderTextInput('apellidos', 'Apellidos')}
            {renderTextInput('cedula', 'Número de cédula', { keyboardType: 'numeric' })}
            {renderTextInput('carrera', 'Carrera')}
            {renderTextInput('facultad', 'Facultad')}
          </>
        ), 'person', 'Ionicons')}

        {renderSection('¿El agresor es parte de la PUCE?', 
          renderOptionButton('agresorPuce', formData.agresorPuce), 'help-outline', 'MaterialIcons')}

        {formData.agresorPuce === 'si' && (
          <>
            {renderSection('Información del Agresor', (
              <>
                {renderTextInput('nombreAgresor', 'Nombre del agresor (si se conoce)')}
                {renderTextInput('correoAgresor', 'Correo institucional del agresor')}
                {renderTextInput('descripcionFisica', 'Descripción física del agresor')}
              </>
            ), 'user', 'FontAwesome5')}

            {renderSection('Detalles del Incidente', (
              <>
                {renderOptionButton('tipoViolencia', formData.tipoViolencia, 'Tipo de violencia')}
                {formData.tipoViolencia === 'otro' && 
                  renderTextInput('tipoViolenciaOtro', 'Especifica el tipo de violencia')}
                {renderOptionButton('periodoAcademico', formData.periodoAcademico, 'Período académico')}

                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                  <Text>{formData.fecha.toLocaleDateString()}</Text>
                  <MaterialIcons name="calendar-today" size={wp('5%')} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={formData.fecha}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                )}

                {renderTextInput('titulo', 'Título del incidente')}
                {renderTextInput('descripcion', 'Describe lo que ocurrió', { 
                  style: [styles.input, styles.textArea], 
                  multiline: true, 
                  numberOfLines: 4 
                })}
                {renderTextInput('ubicacion', '¿Dónde ocurrió?')}
                {renderTextInput('ubicacionExacta', 'Ubicación exacta')}
              </>
            ), 'description', 'MaterialIcons')}

            {renderSection('Evidencia', (
              <>
                <TouchableOpacity style={styles.evidenceButton} onPress={pickImage}>
                  <MaterialIcons name="attach-file" size={wp('5%')} />
                  <Text>Subir archivo (imagen o video)</Text>
                </TouchableOpacity>
                {evidencias.map((evidencia, i) => (              
                  <View key={i} style={styles.evidenciaItem}>
                    {evidencia.mime.startsWith('image') && (
                      <Image source={{ uri: evidencia.uri }} style={styles.evidenciaImage} />
                    )}
                    <TouchableOpacity onPress={() => removeEvidencia(i)}>
                      <MaterialIcons name="close" size={wp('5%')} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}


              </>
            ), 'attach-file', 'MaterialIcons')}
          </>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Denuncia</Text>
        </TouchableOpacity>
      </ScrollView>

      <LinearGradient
        colors={['rgba(242, 242, 247, 0)', 'rgba(242, 242, 247, 1)']}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowModal(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccione una opción</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={wp('6%')} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={modalOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleOptionSelect(item.value)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}