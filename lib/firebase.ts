import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "drive-5edb5.firebaseapp.com",
    projectId: "drive-5edb5",
    storageBucket: "drive-5edb5.appspot.com",
    messagingSenderId: "221178016632",
    appId: "1:221178016632:web:7371cae4181715753d8e8d"
};

!getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore();
const storage = getStorage();
export { db, storage }