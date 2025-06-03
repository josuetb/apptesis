import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Fondo anterior
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: wp('5%'),
    paddingBottom: hp('10%'), // Espacio para la barra de navegación inferior
  },
  mainTitleContainer: {
    alignItems: 'center',
    marginBottom: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#007ACC', // Color del título
    marginLeft: wp('2%'),
  },
  section: {
    marginBottom: hp('3%'),
    backgroundColor: '#FFFFFF', // Fondo blanco para las secciones
    borderRadius: 15, // Bordes redondeados para las secciones
    padding: wp('4%'), // Padding dentro de las secciones
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  sectionIcon: {
    marginRight: wp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#007ACC', // Color del título de sección
  },
  inputContainer: {
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('3.8%'),
    color: '#555', // Color del label
    marginBottom: hp('1%'),
  },
  input: {
    backgroundColor: '#F2F2F7', // Fondo ligeramente gris como en la imagen de los campos
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    fontSize: wp('3.8%'),
    color: '#333', // Color del texto ingresado
    borderWidth: 1,
    borderColor: '#D1D1D6', // Borde gris
  },
  textArea: {
    height: hp('12%'), // Altura para text areas
    textAlignVertical: 'top', // Alineación vertical para texto multilinea
  },
  optionButton: {
    backgroundColor: '#F2F2F7', // Fondo similar al de los inputs
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  optionButtonText: {
    fontSize: wp('3.8%'),
    color: '#333', // Color del texto seleccionado
  },
  dateButton: {
    backgroundColor: '#F2F2F7', // Fondo similar al de los inputs
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  dateButtonText: {
    fontSize: wp('3.8%'),
    color: '#333', // Color del texto de la fecha
  },
  evidenceContainer: {
    marginTop: hp('1%'),
  },
  evidenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: wp('3%'),
    borderWidth: 1,
    borderColor: '#C6C6C8',
    borderStyle: 'dashed',
  },
  evidenceButtonText: {
    color: '#000',
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
  },
  evidenciasList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('2%'),
    gap: wp('2%'),
  },
  evidenciaItem: {
    width: wp('28%'),
    height: wp('28%'),
    marginBottom: hp('1%'),
    position: 'relative',
  },
  evidenciaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeEvidenciaButton: {
    position: 'absolute',
    top: -wp('2%'),
    right: -wp('2%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2.5%'),
    padding: wp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: wp('4%'),
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp('4%'),
    paddingTop: hp('2%'),
    maxHeight: hp('70%'),
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
  },
  modalTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  modalOption: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  modalOptionText: {
    fontSize: wp('4%'),
    color: '#007AFF',
  },
  optionSeparator: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginHorizontal: wp('4%'),
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: hp('10%'), // Ajusta la altura según la barra de navegación
  },
});

export default styles; 