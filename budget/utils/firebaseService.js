// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN3B2fAbKPYmvR4jDd8jrHlm_RtClFT7A",
  authDomain: "kuber-702b2.firebaseapp.com",
  projectId: "kuber-702b2",
  storageBucket: "kuber-702b2.appspot.com",
  messagingSenderId: "956070467667",
  appId: "1:956070467667:web:c72a128037170bee548ea6",
  measurementId: "G-0CYBK72DF2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
