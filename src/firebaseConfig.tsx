import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMzeVK4mofd5kJFR7vwjGF2qkM3Ex1TDg",
  authDomain: "mobilehealth-4877d.firebaseapp.com",
  projectId: "mobilehealth-4877d",
  storageBucket: "mobilehealth-4877d.appspot.com",
  messagingSenderId: "158539614206",
  appId: "1:158539614206:web:6263e7d26410d7a7f662af",
  measurementId: "G-SFVKQM4M3C"
};

export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);
export const db = getFirestore(app);