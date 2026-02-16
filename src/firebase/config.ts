import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJSoqQMHlcUA5FmHDOjbmxayJUIjPU64A",
  authDomain: "learn-lingo-46084.firebaseapp.com",
  projectId: "learn-lingo-46084",
  storageBucket: "learn-lingo-46084.firebasestorage.app",
  messagingSenderId: "682106051655",
  appId: "1:682106051655:web:a98e52cfc60fbf50736562",
  measurementId: "G-N52QQVJRS5"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);