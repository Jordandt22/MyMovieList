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

  // Create DB User
  const createDBUser = (uid, data, accessToken, cb) =>
    axios
      .post(REACT_APP_API_URL + `/user/${uid}`, data, config(accessToken))
      .then((res) => cb(res, null))
      .catch((err) => cb(null, err));

  // Get DB User
  const getDBUser = (uid, accessToken, cb) =>
    axios
      .get(REACT_APP_API_URL + `/user/${uid}`, config(accessToken))
      .then((res) => cb(res, null))
      .catch((err) => cb(null, err));

  return (
    <APIContext.Provider value={{ auth: { createDBUser, getDBUser } }}>
      {props.children}
    </APIContext.Provider>
  );
};
