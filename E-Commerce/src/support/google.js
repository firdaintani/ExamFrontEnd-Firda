import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyB1X9uJVytpr2ueObvwt0ojXtVNqTg8Keo",
    authDomain: "fir-67125.firebaseapp.com",
    databaseURL: "https://fir-67125.firebaseio.com",
    projectId: "fir-67125",
    storageBucket: "fir-67125.appspot.com",
    messagingSenderId: "310152183443"
};

firebase.initializeApp(config)
export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();

