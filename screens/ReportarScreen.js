import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/ReportarScreenStyles';

export default function ReportarScreen() {
  const [formData, setFormData] = useState({
    rol: '',
    rolOtro: '',
    titulo: '',
    descripcion: '',
    fecha: new Date(),
    ubicacion: '',
    ubicacionExacta: '',
    agresorPuce: '',
    tipoViolencia: '',
    nombreAgresor: '',
    correoAgresor: '',
    descripcionFisica: '',
  });

  const [evidencias, setEvidencias] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalOptions, setModalOptions] = useState([]);

  const handleDateChange = (event, selectedDate) => {
    const { type } = event;

    // Si el tipo de evento es 'set' (usuario seleccionó una fecha)
    if (type === 'set') {
      if (selectedDate) {
        setFormData({ ...formData, fecha: selectedDate });
      }
    } // Si el tipo de evento es 'dismissed' (usuario canceló)
    else if (type === 'dismissed') {
      // No hacer nada, simplemente cerrar el picker
    }

    // Ocultar el picker en cualquier caso después de un evento
    setShowDatePicker(false);
  };

  const showOptionsModal = (type) => {
    let options = [];
    switch (type) {
      case 'rol':
        options = [
          { label: 'Estudiante', value: 'estudiante' },
          { label: 'Docente', value: 'docente' },
          { label: 'Otro', value: 'otro' },
        ];
        break;
      case 'agresorPuce':
        options = [
          { label: 'Sí', value: 'si' },
          { label: 'No', value: 'no' },
        ];
        break;
      case 'tipoViolencia':
        options = [
          { label: 'Acoso', value: 'acoso' },
          { label: 'Discriminación', value: 'discriminacion' },
          { label: 'Intimidación', value: 'intimidacion' },
          { label: 'Acoso Sexual', value: 'acoso_sexual' },
          { label: 'Acoso Cibernético', value: 'acoso_cibernetico' },
        ];
        break;
    }
    setModalOptions(options);
    setModalType(type);
    setShowModal(true);
  };

  const handleOptionSelect = (value) => {
    setFormData({ ...formData, [modalType]: value });
    setShowModal(false);
  };

  const handleSubmit = () => {
    // Define required fields
    const requiredFields = ['rol', 'descripcion', 'fecha', 'tipoViolencia'];

    // Check if all required fields are filled
    let allFieldsFilled = true;
    let missingFields = [];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        allFieldsFilled = false;
        missingFields.push(field);
      }
    });

    // Additional check for rolOtro if rol is 'otro'
    if (formData.rol === 'otro' && !formData.rolOtro) {
      allFieldsFilled = false;
      missingFields.push('rolOtro');
    }

    if (!allFieldsFilled) {
      // Map internal field names to user-friendly names for the alert
      const fieldNamesMap = {
        rol: 'Rol en la Universidad',
        descripcion: 'Describe lo que ocurrió',
        fecha: 'Fecha del Incidente',
        tipoViolencia: 'Tipo de violencia experimentada',
        rolOtro: 'Especifica tu rol',
      };
      const displayMissingFields = missingFields.map(field => fieldNamesMap[field] || field);
      Alert.alert(
        'Campos obligatorios incompletos',
        `Por favor, completa los siguientes campos:
- ${displayMissingFields.join('\n- ')}`,
        [{ text: 'OK' }]
      );
    } else {
      // Process the submission (this is where you would send the data)
      console.log('Report Data:', formData);
      console.log('Evidencias:', evidencias);
      
      // Show success message
      Alert.alert(
        'Reporte Enviado',
        'Tu reporte ha sido enviado al área de Bienestar Estudiantil.',
        [{ text: 'OK' }]
      );
      
      // Optionally, clear the form or navigate away
      // setFormData({...});
      // setEvidencias([]);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a tu galería para adjuntar evidencias.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setEvidencias([...evidencias, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const removeEvidencia = (index) => {
    const nuevasEvidencias = [...evidencias];
    nuevasEvidencias.splice(index, 1);
    setEvidencias(nuevasEvidencias);
  };

  const renderSection = (title, children, iconName, iconSet) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        {iconSet === 'MaterialIcons' ? (
          <MaterialIcons name={iconName} size={wp('5%')} color="#007AFF" style={styles.sectionIcon} />
        ) : iconSet === 'Ionicons' ? (
          <Ionicons name={iconName} size={wp('5%')} color="#007AFF" style={styles.sectionIcon} />
        ) : iconSet === 'FontAwesome5' ? (
          <FontAwesome5 name={iconName} size={wp('5%')} color="#007AFF" style={styles.sectionIcon} />
        ) : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  const renderOptionButton = (type, value, label) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => showOptionsModal(type)}
    >
      <Text style={styles.optionButtonText}>
        {value ? label : 'Seleccione una opción'}
      </Text>
      <MaterialIcons name="chevron-right" size={wp('6%')} color="#8E8E93" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Título principal */}
        <View style={styles.mainTitleContainer}>
           <Text style={styles.mainTitle}>Reportar un incidente</Text>
        </View>

        {/* Información Personal */}
        {renderSection('Información Personal', (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Rol en la Universidad</Text>
            {renderOptionButton('rol', formData.rol,
              formData.rol === 'estudiante' ? 'Estudiante' :
              formData.rol === 'docente' ? 'Docente' : formData.rol === 'otro' ? 'Otro' : ''
            )}
            {formData.rol === 'otro' && (
              <TextInput
                style={[styles.input, { marginTop: hp('1%') }]}
                value={formData.rolOtro}
                onChangeText={(text) => setFormData({ ...formData, rolOtro: text })}
                placeholder="Especifica tu rol"
                placeholderTextColor="#8E8E93"
              />
            )}
          </View>
        ), 'person-outline', 'Ionicons')}

        {/* Detalles del Incidente */}
        {renderSection('Detalles del Incidente', (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Título del Incidente (Opcional)</Text>
              <TextInput
                style={styles.input}
                value={formData.titulo}
                onChangeText={(text) => setFormData({ ...formData, titulo: text })}
                placeholder="Ingrese un título para el incidente"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Describe lo que ocurrió</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.descripcion}
                onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
                placeholder="Describe detalladamente lo que sucedió"
                placeholderTextColor="#8E8E93"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha del Incidente</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>{formData.fecha.toLocaleDateString()}</Text>
                <MaterialIcons name="calendar-today" size={wp('5%')} color="#8E8E93" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.fecha}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                />
              )}
            </View>
          </>
        ), 'description', 'MaterialIcons')}

        {/* Ubicación */}
        {renderSection('Ubicación', (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>¿Dónde ocurrió?</Text>
              <TextInput
                style={styles.input}
                value={formData.ubicacion}
                onChangeText={(text) => setFormData({ ...formData, ubicacion: text })}
                placeholder="Ej: Campus Principal, Campus Sur, etc."
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ubicación exacta</Text>
              <TextInput
                style={styles.input}
                value={formData.ubicacionExacta}
                onChangeText={(text) => setFormData({ ...formData, ubicacionExacta: text })}
                placeholder="Ej: Edificio 5, Aula 302, etc."
                placeholderTextColor="#8E8E93"
              />
            </View>
          </>
        ), 'location-pin', 'MaterialIcons')}

        {/* Información del Agresor */}
        {renderSection('Información del Agresor', (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>¿El agresor pertenece a la comunidad PUCE?</Text>
              {renderOptionButton('agresorPuce', formData.agresorPuce,
                formData.agresorPuce === 'si' ? 'Sí' : formData.agresorPuce === 'no' ? 'No' : ''
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de violencia experimentada</Text>
              {renderOptionButton('tipoViolencia', formData.tipoViolencia,
                modalOptions.find(opt => opt.value === formData.tipoViolencia)?.label || ''
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre y apellido del agresor (si lo conoces)</Text>
              <TextInput
                style={styles.input}
                value={formData.nombreAgresor}
                onChangeText={(text) => setFormData({ ...formData, nombreAgresor: text })}
                placeholder="Nombre completo del agresor"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo institucional del agresor</Text>
              <TextInput
                style={styles.input}
                value={formData.correoAgresor}
                onChangeText={(text) => setFormData({ ...formData, correoAgresor: text })}
                placeholder="correo@puce.edu.ec"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Descripción física (si no conoces su nombre)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.descripcionFisica}
                onChangeText={(text) => setFormData({ ...formData, descripcionFisica: text })}
                placeholder="Describe las características físicas del agresor"
                placeholderTextColor="#8E8E93"
                multiline
                numberOfLines={4}
              />
            </View>
          </>
        ), 'person', 'Ionicons')}

        {/* Evidencia */}
        {renderSection('Evidencia', (
          <View style={styles.evidenceContainer}>
            <TouchableOpacity style={styles.evidenceButton} onPress={pickImage}>
              <MaterialIcons name="attach-file" size={wp('5%')} color="#000" />
              <Text style={styles.evidenceButtonText}>Adjuntar imágenes o documentos</Text>
            </TouchableOpacity>
            
            {evidencias.length > 0 && (
              <View style={styles.evidenciasList}>
                {evidencias.map((uri, index) => (
                  <View key={index} style={styles.evidenciaItem}>
                    <Image source={{ uri }} style={styles.evidenciaImage} />
                    <TouchableOpacity 
                      style={styles.removeEvidenciaButton}
                      onPress={() => removeEvidencia(index)}
                    >
                      <MaterialIcons name="close" size={wp('5%')} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        ), 'attach-file', 'MaterialIcons')}

        {/* Botón de Enviar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Linear Gradient al final del contenido */}
      <LinearGradient
        colors={['rgba(242, 242, 247, 0)', 'rgba(242, 242, 247, 1)']} // Degradado de transparente a blanco
        style={styles.gradientOverlay}
        pointerEvents="none" // Permite interactuar con los elementos debajo
      />

      {/* Modal de Opciones */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'rol' ? 'Seleccione su rol' :
                 modalType === 'agresorPuce' ? '¿El agresor pertenece a la comunidad PUCE?' :
                 'Tipo de violencia experimentada'}
              </Text>
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
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.optionSeparator} />}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
