import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Logo o imagen de la aplicación */}
      <Image
        source={require('../../assets/splash-screen-1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Nombre de la aplicación */}
      <Text style={styles.appName}>Evaluación Práctica</Text>
      <Text style={styles.subtitle}>Módulo 5 - Desarrollo Móvil</Text>
      
      {/* Indicador de carga */}
      <ActivityIndicator 
        size="large" 
        color="#007AFF" 
        style={styles.loader} 
      />
      
      {/* Información adicional */}
      <Text style={styles.loadingText}>Cargando aplicación...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
}); 