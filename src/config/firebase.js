// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkIutBBq3qcQZ5QiR4DG6d5ifOLmYWxK8",
  authDomain: "evaluacion-practica-24f5c.firebaseapp.com",
  projectId: "evaluacion-practica-24f5c",
  storageBucket: "evaluacion-practica-24f5c.firebasestorage.app",
  messagingSenderId: "777768075731",
  appId: "1:777768075731:web:aac7242a5941770a152f26"
};

// Debug: verificar configuración
console.log("=== FIREBASE CONFIG DEBUG ===");
console.log("API_KEY:", API_KEY ? "✓" : "✗");
console.log("AUTH_DOMAIN:", AUTH_DOMAIN ? "✓" : "✗");
console.log("PROJECT_ID:", PROJECT_ID ? "✓" : "✗");
console.log("Config completa:", firebaseConfig);

// Initialize Firebase (evita inicialización múltiple)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase inicializado correctamente");
} else {
  app = getApp();
  console.log("✅ Firebase ya estaba inicializado");
}

// Initialize Firebase services
const database = getFirestore(app);

// Initialize Firebase Auth with proper error handling to avoid double initialization
let auth;
try {
  // Try to get existing auth instance first
  auth = getAuth(app);
  console.log("✅ Usando instancia de Auth existente");
} catch (error) {
  // If no existing instance, initialize with AsyncStorage persistence
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    console.log("✅ Firebase Auth inicializado con persistencia AsyncStorage");
  } catch (initError) {
    if (initError.code === 'auth/already-initialized') {
      // If already initialized, just get the existing instance
      auth = getAuth(app);
      console.log("✅ Auth ya estaba inicializado, obteniendo instancia existente");
    } else {
      console.error("❌ Error inicializando Firebase Auth:", initError);
      throw initError;
    }
  }
}

export { database, auth };