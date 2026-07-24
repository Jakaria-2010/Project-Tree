// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

// Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  
  apiKey: "AIzaSyD9NoaOrtABI63unHmcDHMpK6Kwv4KfqHI",
  authDomain: "organic-food-jakaria.firebaseapp.com",
  projectId: "organic-food-jakaria",
  storageBucket: "organic-food-jakaria.firebasestorage.app",
  messagingSenderId: "283724929228",
  appId: "1:283724929228:web:9693d5a5bcc7d41a1d4a69"
  
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };