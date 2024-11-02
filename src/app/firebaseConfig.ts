// src/app/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"; // Importa o Firestore e a função collection

const firebaseConfig = {
  apiKey: "AIzaSyA4kyGgTEfwp0QKRaW9wWyHmw3H5oO0vD0",
  authDomain: "task-manager-86761.firebaseapp.com",
  projectId: "task-manager-86761",
  storageBucket: "task-manager-86761.appspot.com",
  messagingSenderId: "414961813629",
  appId: "1:414961813629:web:2c4e6b558151482f700914",
  measurementId: "G-SRLT9E9LKN",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth
const auth = getAuth(app);

// Inicializa o Firestore
const db = getFirestore(app); // Inicializa o Firestore

// Define a coleção de tarefas
const tasksCollection = collection(db, "tasks"); // Certifique-se de que "tasks" é o nome correto da coleção

// Inicializa o Analytics apenas no cliente e em ambientes suportados
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, analytics, db, tasksCollection }; // Exporte também o tasksCollection
