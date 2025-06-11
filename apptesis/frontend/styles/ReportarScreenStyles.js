import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Estilos base
const baseStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: wp('5%'),
    paddingBottom: hp('10%'),
  },
};

// Estilos del título
const titleStyles = {
  mainTitleContainer: {
    alignItems: 'center',
    marginBottom: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#007ACC',
    marginLeft: wp('2%'),
  },
};

// Estilos de secciones
const sectionStyles = {
  section: {
    marginBottom: hp('3%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,122,204,0.1)',
  },
  sectionIcon: {
    marginRight: wp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#007ACC',
  },
};

// Estilos de formulario
const formStyles = {
  inputContainer: {
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: wp('3.8%'),
    color: '#555',
    marginBottom: hp('1.5%'),
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    fontSize: wp('3.8%'),
    color: '#333',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    height: hp('12%'),
    textAlignVertical: 'top',
  },
};

// Estilos de botones
const buttonStyles = {
  optionButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionButtonText: {
    fontSize: wp('3.8%'),
    color: '#333',
    fontWeight: '500',
  },
  dateButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateButtonText: {
    fontSize: wp('3.8%'),
    color: '#333',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007ACC',
    borderRadius: 15,
    padding: wp('4%'),
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
};

// Estilos de evidencia
const evidenceStyles = {
  evidenceContainer: {
    marginTop: hp('2%'),
  },
  evidenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: wp('4%'),
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderStyle: 'dashed',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  evidenceButtonText: {
    color: '#007ACC',
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
  evidenciasList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('2%'),
    gap: wp('3%'),
  },
  evidenciaItem: {
    width: wp('28%'),
    height: wp('28%'),
    marginBottom: hp('2%'),
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  evidenciaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
};

// Estilos del modal
const modalStyles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: wp('5%'),
    paddingTop: hp('2%'),
    maxHeight: hp('70%'),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  modalOption: {
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 10,
    marginVertical: hp('0.5%'),
  },
  modalOptionText: {
    fontSize: wp('4%'),
    color: '#007ACC',
    fontWeight: '500',
  },
  optionSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: wp('4%'),
  },
};

// Combinar todos los estilos
const styles = StyleSheet.create({
  ...baseStyles,
  ...titleStyles,
  ...sectionStyles,
  ...formStyles,
  ...buttonStyles,
  ...evidenceStyles,
  ...modalStyles,
});

export default styles; 