import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: wp('8%'),
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    width: wp('25%'),
    height: wp('25%'),
    marginBottom: hp('3%'),
    resizeMode: 'contain',
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#333',
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#555',
    marginBottom: hp('4%'),
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    marginBottom: hp('3%'),
    backgroundColor: '#F2F2F7',
  },
  inputIcon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: hp('1.8%'),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
});

export default styles; 