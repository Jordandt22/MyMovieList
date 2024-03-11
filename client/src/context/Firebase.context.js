import React, { createContext, useContext, useEffect } from "react";

// Contexts
import { useGlobal } from "./Global.context";
import { useAuth } from "./Auth.context";

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
const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseContextProvider = (props) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const Auth = getAuth();
  const { setLoading } = useGlobal().state;
  const { authenticateUser, logoutUser } = useAuth();

  // Get Current User
  const getCurrentUser = (cb) => onAuthStateChanged(Auth, (user) => cb(user));

  // Check Auth Session
  useEffect(() => {
    setLoading(true);
    getCurrentUser((user) => {
      if (user) {
        const { accessToken, uid } = user;

        // Get Information from Database
        console.log(user);

        authenticateUser(accessToken, uid);
      }

      setLoading(false);
    });
  }, []);

  // Create Email User
  const createEmailUser = (email, password, cb) =>
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authenticateUser(user.accessToken, user.uid);
        cb(user, null);
      })
      .catch((error) => console.log(error));

  // Sign In Email User
  const signInEmailUser = (email, password, cb) =>
    signInWithEmailAndPassword(Auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      authenticateUser(user.accessToken, user.uid);
      cb(user, null);
    });

  // Log Out User
  const logoutFirebaseUser = () =>
    signOut(Auth).then(() => {
      logoutUser();
    });

  // Delete Firebase User
  const deleteFirebaseUser = () =>
    deleteUser(Auth.currentUser).then(() => {
      logoutUser();
    });

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        Auth,
        functions: {
          getCurrentUser,
          createEmailUser,
          logoutFirebaseUser,
          signInEmailUser,
          deleteFirebaseUser,
        },
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
