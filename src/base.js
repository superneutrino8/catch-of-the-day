import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBN5TI4pJKsMXwyihFfMuVFgmHQGpVrP0U",
    authDomain: "catch-of-the-day-59f44.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-59f44.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export {firebaseApp};

export default base;