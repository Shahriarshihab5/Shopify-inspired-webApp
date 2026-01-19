// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrwltfeDBr0jyFUu-4NJQmUTS-C_7c4tc",
  authDomain: "opifyclone.firebaseapp.com",
  projectId: "opifyclone",
  storageBucket: "opifyclone.firebasestorage.app",
  messagingSenderId: "12582823866",
  appId: "1:12582823866:web:1a89755ebb8bcf6a415f83",
  measurementId: "G-478PLQ1NYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);