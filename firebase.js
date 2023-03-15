
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
//import * as firebase from 'firebase'
//import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBZtP9dlnqsNFqve8LvauyQsp3_dHC_flE",
  authDomain: "react-native-instagram-f581b.firebaseapp.com",
  projectId: "react-native-instagram-f581b",
  storageBucket: "react-native-instagram-f581b.appspot.com",
  messagingSenderId: "317629349120",
  appId: "1:317629349120:web:701eab5d0afb5f4c69c7e5",
};
// if (firebase.app.lenght === 0) {
//     firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, storage, db };

