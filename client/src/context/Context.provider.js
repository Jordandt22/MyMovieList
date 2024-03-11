import React from "react";

// Contexts
import { FirebaseContextProvider } from "./Firebase.context";
import { TMDBContextProvider } from "./Tmdb.context";
import { GlobalContextProvider } from "./Global.context";
import { AuthContextProvider } from "./Auth.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <FirebaseContextProvider>
          <TMDBContextProvider>{props.children}</TMDBContextProvider>
        </FirebaseContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
