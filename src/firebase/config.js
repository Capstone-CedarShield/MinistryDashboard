import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfxwrifLbNQ6sVhiUccjtt8eO6aR0l1Sk",
  authDomain: "capstoneproject-db15f.firebaseapp.com",
  projectId: "capstoneproject-db15f",
  storageBucket: "capstoneproject-db15f.firebasestorage.app",
  messagingSenderId: "100308329505",
  appId: "1:100308329505:web:d99f0d5c553165e9cf2f60",
  measurementId: "G-XYWPPGHJRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export {auth,app};