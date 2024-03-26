import React from "react";

// Contexts
import { FirebaseContextProvider } from "./auth/Firebase.context";
import { AuthContextProvider } from "./auth/Auth.context";

import { TMDBContextProvider } from "./data/Tmdb.context";
import { APIContextProvider } from "./data/API.context";

import { GlobalContextProvider } from "./state/Global.context";
import { UtilContextProvider } from "./state/Util.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <UtilContextProvider>
        <APIContextProvider>
          <AuthContextProvider>
            <FirebaseContextProvider>
              <TMDBContextProvider>{props.children}</TMDBContextProvider>
            </FirebaseContextProvider>
          </AuthContextProvider>
        </APIContextProvider>
      </UtilContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
