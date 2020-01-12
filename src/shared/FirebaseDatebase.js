import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCswQt2y-FdVL8t3Pt7dFOL_2lzKLIsZeQ",
    authDomain: "course-scheduler-fe519.firebaseapp.com",
    databaseURL: "https://course-scheduler-fe519.firebaseio.com",
    projectId: "course-scheduler-fe519",
    storageBucket: "course-scheduler-fe519.appspot.com",
    messagingSenderId: "907270760093",
    appId: "1:907270760093:web:1a4164c449285952a2d674",
    measurementId: "G-99EX39BLYG"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref();

export default db;