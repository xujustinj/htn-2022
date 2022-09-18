// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg3dNYNWn_ux2pWs8rkuAbqS6j9uBZgSE",
  authDomain: "hackthenorthproj-1663425489368.firebaseapp.com",
  projectId: "hackthenorthproj-1663425489368",
  storageBucket: "hackthenorthproj-1663425489368.appspot.com",
  messagingSenderId: "558603208974",
  appId: "1:558603208974:web:bc4afe002059954869ef5f",
  measurementId: "G-7C6J3YY5CP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
//export const analytics = getAnalytics(app);
