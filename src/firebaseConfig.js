//import firebase from 'firebase/app'
//require ('firebase/auth')
//require ('firebase/database')

import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBSHahqSKNdF9NsatEHUPmVMZ0pEdALW9w',
  authDomain: 'mobile-market-6d4e2.firebaseapp.com',
  databaseURL: 'https://mobile-market-6d4e2.firebaseio.com',
  projectId: 'mobile-market-6d4e2',
  storageBucket: 'mobile-market-6d4e2.appspot.com',
  messagingSenderId: '1028900346767',
  appId: '1:1028900346767:web:dca47c31af4920f0'
};

firebase.initializeApp(config)

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      func(true, user)
    }else {
      func(false)
    }
  }, error => {
    console.log(error)
  })
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
