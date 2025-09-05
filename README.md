# Evaluación Práctica - Módulo 5
## Desarrollo de componentes para dispositivos móviles

---

### 📋 Información del Estudiante
Integrante 1:
**Nombre del estudiante: Aldo Andrè Molina Maldonado 
**Carnet:** 20230331  
**Grupo/Sección:** A1 
Integrante 2:
**Nombre del estudiante: Ragael Alberto Vargas Landaverde
**Carnet:** 20230402
**Grupo/Sección:** A1 
---

### 🎥 Video Demostrativo

**Enlace del video:** https://drive.google.com/file/d/1r6sFTCPxtL66o4BQh6e1ThcsUd5-G8SP/view?usp=sharing

> **Nota:** El video demuestra la funcionalidad completa de la aplicación, incluyendo la verificación del almacenamiento de datos en Firebase.

---

### 📱 Descripción del Proyecto

Aplicación móvil desarrollada con **React Native Expo** y **Firebase** que implementa un sistema completo de autenticación de usuarios con las siguientes funcionalidades:

- 🚀 **Splash Screen** - Pantalla de carga inicial
- 👤 **Registro de usuarios** - Autenticación por correo electrónico
- 🔑 **Inicio de sesión** - Login con validación
- 🏠 **Pantalla principal** - Bienvenida personalizada
- ✏️ **Edición de perfil** - Modificación de información del usuario

---

### 🛠 Dependencias Utilizadas

```json
{
  "@react-native-async-storage/async-storage": "^2.1.2",
  "@react-navigation/bottom-tabs": "^7.4.7",
  "@react-navigation/native": "^7.1.17",
  "@react-navigation/native-stack": "^7.3.26",
  "expo": "~53.0.22",
  "expo-constants": "^17.1.7",
  "expo-image-picker": "^16.1.4",
  "expo-status-bar": "~2.2.3",
  "firebase": "^12.2.1",
  "react": "19.0.0",
  "react-native": "0.79.6",
  "react-native-dotenv": "^3.4.11",
  "react-native-gesture-handler": "^2.28.0",
  "react-native-safe-area-context": "^5.6.1"
}
```

---

### 📁 Estructura del Proyecto

```
src/
├── config/
│   └── firebase.js          # Configuración de Firebase
├── navigation/
│   └── Navigation.js        # Sistema de navegación principal
└── screens/
    ├── SplashScreen.js      # Pantalla de carga
    ├── LoginScreen.js       # Pantalla de inicio de sesión
    ├── RegisterScreen.js    # Pantalla de registro
    ├── HomeScreen.js        # Pantalla principal
    └── EditProfileScreen.js # Pantalla de edición de perfil
```

---

### 🔥 Configuración de Firebase

La aplicación utiliza Firebase para:

- **Authentication** - Autenticación por correo electrónico
- **Firestore** - Almacenamiento de datos de usuarios
- **AsyncStorage** - Persistencia de sesión

**Campos almacenados por usuario:**
- Nombre completo
- Correo electrónico
- Título universitario
- Año de graduación
- Fechas de creación y actualización

---

### 🚀 Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd evaluacion_Modulo5_[Nombre]_[Carnet]
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Crear archivo `.env` con las credenciales de Firebase
   
4. **Ejecutar la aplicación:**
   ```bash
   npx expo start
   ```

---

### ✨ Características Implementadas

#### 🔐 Sistema de Autenticación
- Registro con validación de campos
- Inicio de sesión seguro
- Persistencia de sesión
- Cerrar sesión

#### 🏠 Pantalla Principal
- Saludo personalizado con nombre del usuario
- Información académica
- Navegación por tabs

#### ✏️ Edición de Perfil
- Modificación de datos personales
- Validación de formularios
- Actualización en tiempo real

#### 📱 Navegación
- Tab Navigator para usuarios autenticados
- Stack Navigator para flujo de autenticación
- Transiciones suaves entre pantallas

---

### 🎯 Cumplimiento de Requisitos

- ✅ **Splash Screen** implementado
- ✅ **Registro de usuarios** con Firebase Auth
- ✅ **Inicio de sesión** funcional
- ✅ **Home Screen** con información personalizada
- ✅ **Edición de perfil** completa
- ✅ **Estructura de carpetas** organizada
- ✅ **Navegación por tabs** implementada
- ✅ **Buenas prácticas** de código
- ✅ **Repositorio público** en GitHub

---

### 👨‍🏫 Instituto Técnico Ricaldone

**Módulo:** Desarrollo de componentes para dispositivos móviles  
**Docente:** Daniel Wilfredo Granados Hernández  
**Año:** 3° año de bachillerato en Desarrollo de Software  
**Fecha de entrega:** Viernes 5 de septiembre, 12:15 pm

---

### 📄 Licencia

Este proyecto fue desarrollado con fines educativos para el Instituto Técnico Ricaldone.
