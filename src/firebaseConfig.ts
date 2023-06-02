import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app: firebase.FirebaseApp | null = null;

export const initializeFirebase = () => {
  if (!app) {
    app = firebase.initializeApp(firebaseConfig);
  }
  return app;
};

export const getFirebaseAuth = () => {
  const app = initializeFirebase();
  return getAuth(app);
};

export const getFirebaseDatabase = () => {
  const app = initializeFirebase();
  return getDatabase(app);
};
