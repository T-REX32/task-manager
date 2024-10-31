// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4kyGgTEfwp0QKRaW9wWyHmw3H5oO0vD0",
  authDomain: "task-manager-86761.firebaseapp.com",
  projectId: "task-manager-86761",
  storageBucket: "task-manager-86761.firebasestorage.app",
  messagingSenderId: "414961813629",
  appId: "1:414961813629:web:2c4e6b558151482f700914",
  measurementId: "G-SRLT9E9LKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);