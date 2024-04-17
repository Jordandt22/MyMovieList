import React, { createContext, useContext, useState } from "react";

// User Context
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    uid: null,
    username: "",
    email: "",
  });

  const updateUser = (data) => setUser({ ...data });

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
