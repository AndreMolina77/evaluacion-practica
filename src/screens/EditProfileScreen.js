import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase.js';

export default function EditProfileScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    degree: '',
    graduationYear: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const currentUser = auth.currentUser;

  // Cargar datos actuales del usuario
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(database, 'users', currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormData({
              name: userData.name || currentUser.displayName || '',
              email: userData.email || currentUser.email || '',
              degree: userData.degree || '',
              graduationYear: userData.graduationYear ? userData.graduationYear.toString() : ''
            });
          } else {
            // Si no hay datos en Firestore, usar los datos básicos del Auth
            setFormData({
              name: currentUser.displayName || '',
              email: currentUser.email || '',
              degree: '',
              graduationYear: ''
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

    loadUserData();
  }, [currentUser]);

  // Función para actualizar los datos del formulario
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validar formulario
  const validateForm = () => {
    const { name, degree, graduationYear } = formData;
    
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }

    if (degree.trim() && graduationYear) {
      const currentYear = new Date().getFullYear();
      const gradYear = parseInt(graduationYear);
      if (isNaN(gradYear) || gradYear < 1950 || gradYear > currentYear + 10) {
        Alert.alert('Error', 'Por favor ingresa un año de graduación válido');
        return false;
      }
    }

    return true;
  };

  // Función para guardar cambios
  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const { name, degree, graduationYear } = formData;

      // Actualizar el displayName en Firebase Auth
      if (name !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: name
        });
      }

      // Preparar datos para Firestore
      const updateData = {
        name: name.trim(),
        updatedAt: new Date()
      };

      // Solo agregar campos académicos si tienen valores
      if (degree.trim()) {
        updateData.degree = degree.trim();
      }
      
      if (graduationYear) {
        updateData.graduationYear = parseInt(graduationYear);
      }

      // Actualizar en Firestore
      await updateDoc(doc(database, 'users', currentUser.uid), updateData);

      Alert.alert(
        'Éxito', 
        'Tu información ha sido actualizada correctamente',
        [{ text: 'OK' }]
      );

    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar la información: ' + error.message);
    } finally {
      setIsSaving(false);
    }
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
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {/* Título */}
          <Text style={styles.title}>Editar Perfil</Text>
          <Text style={styles.subtitle}>Modifica tu información personal</Text>

          {/* Campo de nombre */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre completo"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              autoCapitalize="words"
            />
          </View>

          {/* Campo de email (solo lectura) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={formData.email}
              editable={false}
              selectTextOnFocus={false}
            />
            <Text style={styles.helperText}>
              El correo electrónico no se puede modificar
            </Text>
          </View>

          {/* Campo de título universitario */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título Universitario</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Ingeniería en Sistemas"
              value={formData.degree}
              onChangeText={(text) => updateFormData('degree', text)}
              autoCapitalize="words"
            />
          </View>

          {/* Campo de año de graduación */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Año de Graduación</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 2023"
              value={formData.graduationYear}
              onChangeText={(text) => updateFormData('graduationYear', text)}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          {/* Información adicional */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              * Campos obligatorios
            </Text>
          </View>

          {/* Botón de guardar */}
          <TouchableOpacity
            style={[styles.button, isSaving && styles.buttonDisabled]}
            onPress={handleSaveChanges}
            disabled={isSaving}
          >
            <Text style={styles.buttonText}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputDisabled: {
    backgroundColor: '#e9e9e9',
    color: '#666',
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  infoContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});