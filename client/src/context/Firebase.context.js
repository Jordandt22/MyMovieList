import React, { createContext, useContext } from "react";

// Firebase
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mymovielist-5a4a9.firebaseapp.com",
  projectId: "mymovielist-5a4a9",
  storageBucket: "mymovielist-5a4a9.appspot.com",
  messagingSenderId: "462508153953",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-BSB1HLQY7L",
};

// Firebase Context
const firebaseContext = createContext();
export const useFirebase = () => useContext(firebaseContext);
export const FirebaseContextProvider = (props) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const Auth = getAuth();

  // Get Current User
  const getCurrentUser = (cb) => onAuthStateChanged(Auth, (user) => cb(user));

  // Create Email User
  const createEmailUser = (email, password, cb) =>
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        cb(userCredential.user, null);
      })
      .catch((error) => console.log(error));

  // Sign Out User
  const signOutUser = (cb) => signOut(Auth).then(() => cb());

  // Sign In Email User
  const signInEmailUser = (email, password, cb) =>
    signInWithEmailAndPassword(Auth, email, password).then((userCredential) => {
      cb(userCredential.user, null);
    });

  // Delete Firebase User
  const deleteFirebaseUser = (cb) =>
    deleteUser(Auth.currentUser).then(() => cb({}, null));

  return (
    <firebaseContext.Provider
      value={{
        firebaseApp,
        Auth,
        functions: {
          getCurrentUser,
          createEmailUser,
          signOutUser,
          signInEmailUser,
          deleteFirebaseUser,
        },
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};
