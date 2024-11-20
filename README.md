# PurrConnect 🐾✨  

**PurrConnect** es una aplicación móvil construida en **React Native** que permite a los usuarios:  
- Crear comunidades acogedoras.  
- Publicar ideas, imágenes y videos.  
- Conectar en tiempo real mediante chats interactivos.  
- Iniciar sesión y gestionar sus cuentas con Firebase.  

Inspirada en un estilo kawaii 🌸 y diseñada con colores pasteles, **PurrConnect** busca fomentar la creatividad, la interacción y un ambiente cálido y amigable para todos los usuarios.  

---

## 🚀 Características principales  
- **Comunidades personalizables** para compartir contenido.  
- **Chats en tiempo real** para conectar con amigos y otros usuarios.  
- **Autenticación con Firebase** para una experiencia segura y personalizada.  
- **Diseño adorable y moderno** con una paleta de colores kawaii definida en `tailwind.config.js`.  

---

## 🛠 Tecnologías principales  
- **React Native**  
- **Expo**  
- **Firebase**  
- **Tailwind CSS** (configurado con `nativewind` para React Native)  

---

## 🎨 Paleta de colores  
La paleta de colores utilizada en la aplicación está configurada en el archivo `tailwind.config.js`:  

```javascript
colors: {
  main: '#F3C5C5',       // Color principal (rosa pastel)
  secondary: '#C1A3A3',  // Color secundario (rosa apagado)
  tertiary: '#886F6F',   // Color de acento (marrón claro)
  brownie: '#694E4E',    // Color oscuro (marrón chocolate)
  white: '#FFFFFF',      // Blanco para fondos y detalles
},
```

---

## 🖥 Cómo iniciar el proyecto  

### 1. Clona el repositorio  
```bash
git clone https://github.com/tu-usuario/purrconnect.git
cd purrconnect
```

### 2. Instala las dependencias  
Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, ejecuta:  
```bash
npm install
```


Asegúrate de que `tailwind.config.js` incluye las rutas a tus componentes:  
```javascript
content: [
  "./App.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./screens/**/*.{js,jsx,ts,tsx}"
],
```

### 3. Inicia el servidor de desarrollo  
Usa Expo para iniciar el proyecto:  
```bash
npm start
```

Abre la aplicación en tu dispositivo o emulador usando el código QR proporcionado por Expo.

---

## 📂 Estructura del proyecto  

```plaintext
purrconnect/
├── assets/              # Recursos como imágenes y fuentes
├── components/          # Componentes reutilizables
├── screens/             # Pantallas principales de la aplicación
├── tailwind.config.js   # Configuración de Tailwind CSS
├── App.js               # Punto de entrada de la aplicación
├── package.json         # Dependencias y scripts
└── README.md            # Documentación del proyecto
```

---

## ✨ Contribuciones  
¡Las contribuciones son bienvenidas! Si tienes ideas o mejoras, no dudes en crear un issue o un pull request.  

---

## 📧 Contacto  
Si tienes preguntas o comentarios, puedes contactarme en [antoniourielperezpichardo50@gmail.com](antoniourielperezpichardo50@gmail.com).  

---  

¡Gracias por formar parte de **PurrConnect**! 🐾✨  
