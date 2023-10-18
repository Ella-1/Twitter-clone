// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKp-L4eA_4QGTYZGj7x4LvCwDepQ6sxeU",
    authDomain: "twitter-clone-83bee.firebaseapp.com",
    projectId: "twitter-clone-83bee",
    storageBucket: "twitter-clone-83bee.appspot.com",
    messagingSenderId: "389364060544",
    appId: "1:389364060544:web:f1f7467fd21db98407b165"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };