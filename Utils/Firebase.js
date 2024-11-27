// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  
  
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firebase Auth para reutilizarlo en otros módulos
export const auth = getAuth(app);
export default app;