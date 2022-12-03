import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
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
if (!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

//export default {
export {
  firebase
};

export default {
  firebase,
  db
}

export const dbacess = getFirestore();


// Linhas abaixo podem ser retiradas, sendo utilizadas apenas para evitar o aviso de :
//"AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"

//const app = initializeApp(firebaseConfig);

//const auth = initializeAuth(app, {
//  persistence: getReactNativePersistence(AsyncStorage)
//  });
  
//  export { auth };