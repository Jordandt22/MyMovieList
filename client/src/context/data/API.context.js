import React, { createContext, useContext } from "react";
import axios from "axios";

// API Context
const APIContext = createContext();
export const useAPI = () => useContext(APIContext);
export const APIContextProvider = (props) => {
  const { REACT_APP_API_URL } = process.env;

  // Setting Access Token
  const config = (accessToken) => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Sign Up DB User
  const signUpDBUser = (uid, data, accessToken, cb) =>
    axios
      .post(REACT_APP_API_URL + `/user/${uid}`, data, config(accessToken))
      .then((res) => cb(res, null))
      .catch((err) => cb(null, err));

  return (
    <APIContext.Provider value={{ auth: { signUpDBUser } }}>
      {props.children}
    </APIContext.Provider>
  );
};
