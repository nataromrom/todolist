import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCLA-H0LDJAKwbLEvAFtUcD0egdKppJBhM",
    authDomain: "todolist-af462.firebaseapp.com",
    projectId: "todolist-af462",
    storageBucket: "todolist-af462.appspot.com",
    messagingSenderId: "588222369345",
    appId: "1:588222369345:web:9e6e195e0c2e88fd0040c0"
  };

const app = initializeApp (firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);