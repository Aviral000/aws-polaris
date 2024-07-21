// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCNPQTvSupeCuHXaPfhYQhhP0pw2U3elCQ",
  authDomain: "task-reminder-5da7a.firebaseapp.com",
  projectId: "task-reminder-5da7a",
  storageBucket: "task-reminder-5da7a.appspot.com",
  messagingSenderId: "144663252291",
  appId: "1:144663252291:web:1b4e63c25ab8f3121d73f6",
  measurementId: "G-02R6LGC8H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;