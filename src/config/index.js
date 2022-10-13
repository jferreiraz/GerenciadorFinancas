// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJw0tfGU9F9gJ3pwqbTRDrG5EsgnoZaW4",
  authDomain: "gerenciadorfinanceiro-eca68.firebaseapp.com",
  projectId: "gerenciadorfinanceiro-eca68",
  storageBucket: "gerenciadorfinanceiro-eca68.appspot.com",
  messagingSenderId: "531942635254",
  appId: "1:531942635254:web:01701f2e1dee3f0a725ed7",
  measurementId: "G-KJ572M929C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);