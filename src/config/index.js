import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4J2LjJX2BNxz8k56ZzfjVVgm0eN0zQPU",
  authDomain: "financemanager-ef65d.firebaseapp.com",
  projectId: "financemanager-ef65d",
  storageBucket: "financemanager-ef65d.appspot.com",
  messagingSenderId: "261616634632",
  appId: "1:261616634632:web:67a335b5d5e2ed1881babd"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};