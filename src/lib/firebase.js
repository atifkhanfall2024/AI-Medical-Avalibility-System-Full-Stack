const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// ⚠️ dotenv ONLY if you are in Node backend
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "amas-2eb73.firebaseapp.com",
  projectId: "amas-2eb73",
  storageBucket: "amas-2eb73.firebasestorage.app",
  messagingSenderId: "132954597440",
  appId: "1:132954597440:web:abe205d71f8cebbf9b57a5",
  measurementId: "G-6HM0B3BPZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth export
const auth = getAuth(app);

module.exports = { auth };