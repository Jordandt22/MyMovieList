import React from "react";

// Contexts
import { FirebaseContextProvider } from "./Firebase.context";
import { TMDBContextProvider } from "./Tmdb.context";
import { GlobalContextProvider } from "./Global.context";
import { AuthContextProvider } from "./Auth.context";
import { UtilContextProvider } from "./Util.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <UtilContextProvider>
        <AuthContextProvider>
          <FirebaseContextProvider>
            <TMDBContextProvider>{props.children}</TMDBContextProvider>
          </FirebaseContextProvider>
        </AuthContextProvider>
      </UtilContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
