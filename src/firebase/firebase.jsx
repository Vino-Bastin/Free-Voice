import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjXJgMZR5XLXyVY9mfS607cNnolh0ywz4",
  authDomain: "chat-12033.firebaseapp.com",
  projectId: "chat-12033",
  storageBucket: "chat-12033.appspot.com",
  messagingSenderId: "160126642057",
  appId: "1:160126642057:web:911d825ed77280e3096358",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
