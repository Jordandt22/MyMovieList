import React from "react";

// Contexts
import { FirebaseContextProvider } from "./Firebase.context";
import { TMDBContextProvider } from "./Tmdb.context";

function ContextProvider(props) {
  return (
    <FirebaseContextProvider>
      <TMDBContextProvider>{props.children}</TMDBContextProvider>
    </FirebaseContextProvider>
  );
}

export default ContextProvider;
