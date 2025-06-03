import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007ACC',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    backgroundColor: '#E6F7FF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007ACC',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30', // Rojo para acción destructiva
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 

export default styles; 