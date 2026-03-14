// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9Vvfaqu6tuCIPArLodSLdgVGy8OFG9vU",
  authDomain: "muscletrack-4210d.firebaseapp.com",
  projectId: "muscletrack-4210d",
  storageBucket: "muscletrack-4210d.firebasestorage.app",
  messagingSenderId: "752605895973",
  appId: "1:752605895973:web:56b0a1a291ec7dafbd0ecc",
  measurementId: "G-X1SF33N6FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
