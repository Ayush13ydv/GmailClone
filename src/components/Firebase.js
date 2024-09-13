
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE66SWAUPZyKTMFTaD4mczHaVlzbTXMH4",
  authDomain: "myclone-yt-f8682.firebaseapp.com",
  projectId: "myclone-yt-f8682",
  storageBucket: "myclone-yt-f8682.appspot.com",
  messagingSenderId: "1019831123887",
  appId: "1:1019831123887:web:66d9d25a7f09a3d6f6795a",
  measurementId: "G-TF9NYX7J2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Pass the app instance here
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
