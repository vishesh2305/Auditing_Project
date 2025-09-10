import {initializeApp} from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVCI6458YTHkfEPb5AMc6I8ejrHD4JFAk",
  authDomain: "auditai-8891e.firebaseapp.com",
  projectId: "auditai-8891e",
  storageBucket: "auditai-8891e.firebasestorage.app",
  messagingSenderId: "238145581145",
  appId: "1:238145581145:web:452ea5528651fd21658148",
  measurementId: "G-Q2HX7NZ3V8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);