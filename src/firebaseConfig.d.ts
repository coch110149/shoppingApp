import firebase from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';

declare module 'firebase/app' {
  interface FirebaseApp {
    database(): Database;
  }
}

declare global {
  const firebase: firebase.app.App;
}

declare module '../firebaseService' {
  export function initializeFirebase(): firebase.app.App;
  export function getFirebaseAuth(): Auth;
  export const database: Database;
}