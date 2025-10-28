import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYBb0BYvZn2vApsePQ3_f_BupjcRe8OHI",
  authDomain: "bizintelenterprise-63724.firebaseapp.com",
  projectId: "bizintelenterprise-63724",
  storageBucket: "bizintelenterprise-63724.firebasestorage.app",
  messagingSenderId: "394419091617",
  appId: "1:394419091617:web:461e1b57d557c3c99ad8e0",
  measurementId: "G-0136QE5S90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
