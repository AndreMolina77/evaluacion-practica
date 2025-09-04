import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.js';

// Importar pantallas
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación para usuarios autenticados
function AuthenticatedTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio'
        }}
      />
      <Tab.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          tabBarLabel: 'Editar Perfil'
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mostrar splash screen por 2 segundos
    const splashTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Listener para cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!isLoading) {
        // Solo actualizar después de que termine el splash
        clearTimeout(splashTimer);
      }
    });

    return () => {
      clearTimeout(splashTimer);
      unsubscribe();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Usuario autenticado - mostrar tabs
          <Stack.Screen name="AuthenticatedTabs" component={AuthenticatedTabs} />
        ) : (
          // Usuario no autenticado - mostrar pantallas de auth
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}