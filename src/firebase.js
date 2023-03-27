// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx6LTGHBRkw2w9IG_MJDPa2Pr9L599Rrk",
  authDomain: "myeasystudy-c6bad.firebaseapp.com",
  projectId: "myeasystudy-c6bad",
  storageBucket: "myeasystudy-c6bad.appspot.com",
  messagingSenderId: "321363069888",
  appId: "1:321363069888:web:99d9058f9d5af2684e9625",
  measurementId: "G-N938JV4NH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);