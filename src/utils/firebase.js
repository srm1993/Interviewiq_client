
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fir-3dec4.firebaseapp.com",
  projectId: "fir-3dec4",
  storageBucket: "fir-3dec4.firebasestorage.app",
  messagingSenderId: "671476506738",
  appId: "1:671476506738:web:fe04104a504c2010b9e2eb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }