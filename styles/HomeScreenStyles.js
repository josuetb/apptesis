import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
  },
  header: {
    alignItems: 'center',
    padding: wp('5%'),
    paddingTop: hp('2%'),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#007ACC',
    textAlign: 'center',
    marginBottom: hp('1%'),
    marginTop: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    textAlign: 'center',
    color: '#555',
    marginBottom: hp('1%'),
  },
  infoContainer: {
    padding: wp('5%'),
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp('5%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#007ACC',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  infoText: {
    fontSize: wp('3.5%'),
    color: '#666',
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    margin: wp('5%'),
    padding: wp('5%'),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#007ACC',
    marginBottom: hp('2%'),
  },
  contactText: {
    fontSize: wp('3.5%'),
    color: '#666',
    lineHeight: hp('3%'),
  },
});

export default styles; 