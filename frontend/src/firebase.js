// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjpD8Co1bp5yc5a_d5nmKkmRv5sOzlsyo",
  authDomain: "aws-polaris.firebaseapp.com",
  projectId: "aws-polaris",
  storageBucket: "aws-polaris.appspot.com",
  messagingSenderId: "226462897577",
  appId: "1:226462897577:web:020042db72cf68b57f60b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;