// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
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
const auth = getAuth(app);

export { database, auth };