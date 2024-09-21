import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ключи конфигурации из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBU2ukm7kXFCXuYs-BbQMkES8A-6HjZobs",
  authDomain: "murr-market.firebaseapp.com",
  projectId: "murr-market",
  storageBucket: "murr-market.appspot.com",
  messagingSenderId: "842631346613",
  appId: "1:842631346613:web:cec64e3515ef84e91dc1fc"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение экземпляра Firestore
export const db = getFirestore(app);