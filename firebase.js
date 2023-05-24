import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebassConfig ={
    apiKey: "AIzaSyARUnkB8NpvI9M50c5e02jiU3qwAO9EjS0",
    authDomain: "shoppingapp-9155e.firebaseapp.com",
    databaseURL: "https://shoppingapp-9155e-default-rtdb.firebaseio.com",
    projectId: "shoppingapp-9155e",
    storageBucket: "shoppingapp-9155e.appspot.com",
    messagingSenderId: "115456964416",
    appId: "1:115456964416:web:5daa92ce0115214ec1aca5",
    measurementId: "G-W2KW80TWYB"
};

firebase.initializeApp(firebassConfig);

export default firebase;