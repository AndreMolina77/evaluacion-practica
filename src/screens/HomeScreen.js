import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigation = useNavigation();
  const currentUser = auth.currentUser;

  // Función para cargar datos del usuario desde Firestore
  const loadUserData = async () => {
    if (currentUser) {
      try {
        setIsLoading(true);
        const userDoc = await getDoc(doc(database, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Si no hay datos en Firestore, usar los datos básicos del Auth
          setUserData({
            name: currentUser.displayName || 'Usuario',
            email: currentUser.email
          });
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // useEffect inicial para cargar los datos
  useEffect(() => {
    loadUserData();
  }, [currentUser]);

  // useFocusEffect para recargar los datos cada vez que la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [currentUser])
  );

  // Función para cerrar sesión
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              // La navegación se maneja automáticamente por el AuthStateChanged
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ],
    );
  };

  // Función para refrescar manualmente los datos
  const handleRefresh = () => {
    loadUserData();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header de bienvenida */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
        <Text style={styles.userName}>
          {userData?.name || currentUser?.displayName || 'Usuario'}
        </Text>
        <Text style={styles.userEmail}>
          {userData?.email || currentUser?.email}
        </Text>
        
        {/* Botón de refrescar */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleRefresh}
        >
          <Text style={styles.refreshButtonText}>🔄 Actualizar</Text>
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      {userData && (userData.degree || userData.graduationYear) && (
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Información Académica</Text>
          
          {userData.degree && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Título Universitario:</Text>
              <Text style={styles.infoValue}>{userData.degree}</Text>
            </View>
          )}
          
          {userData.graduationYear && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Año de Graduación:</Text>
              <Text style={styles.infoValue}>{userData.graduationYear}</Text>
            </View>
          )}
        </View>
      )}

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.primaryButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleLogout}
        >
          <Text style={styles.secondaryButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Información adicional */}
      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Módulo 5</Text>
        <Text style={styles.footerText}>Desarrollo de componentes para dispositivos móviles</Text>
        <Text style={styles.footerText}>Instituto Técnico Ricaldone</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  welcomeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  refreshButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  secondaryButtonText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: '600',
  },
  footerCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
});