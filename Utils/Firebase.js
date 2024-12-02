import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Importa AsyncStorage

const firebaseConfig = {

};

// Verifica si ya existe una instancia
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Configura la persistencia de la autenticación utilizando AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
