import React, { createContext, useContext, useEffect } from "react";

// Contexts
import { useGlobal } from "../state/Global.context";
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

const errorHandler = (code) => {
  switch (code) {
    case "auth/invalid-credential":
      return {
        password: "There is no account that matches this email and password.",
      };

    case "auth/email-already-exists":
      return {
        email: "An account with this email already exists.",
      };

    default:
      return {};
  }
};

// Firebase Context
const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseContextProvider = (props) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const Auth = getAuth();
  const { setLoading } = useGlobal().state;
  const { authenticateUser, logoutUser } = useAuth();

  // Google Auth
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = (cb) =>
    signInWithPopup(Auth, googleProvider)
      .then((res) => {
        // const googleCred = GoogleAuthProvider.credentialFromResult(res);
        cb(res.user);
      })
      .catch((error) => console.log(error.code, error.message));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create Email User
  const createEmailUser = (email, password, cb) =>
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authenticateUser(user.accessToken, user.uid);
        cb(user, null);
      })
      .catch((error) => cb(null, errorHandler(error.code)));

  // Sign In Email User
  const signInEmailUser = (email, password, cb) =>
    signInWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authenticateUser(user.accessToken, user.uid);
        cb(user, null);
      })
      .catch((error) => cb(null, errorHandler(error.code)));

  // Log Out User
  const logoutFirebaseUser = () =>
    signOut(Auth)
      .then(() => {
        logoutUser();
      })
      .catch((error) => console.log(error.code, error.message));

  // Delete Firebase User
  const deleteFirebaseUser = () =>
    deleteUser(Auth.currentUser)
      .then(() => {
        logoutUser();
      })
      .catch((error) => console.log(error.code, error.message));

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
          signInWithGoogle,
        },
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
