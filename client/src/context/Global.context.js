import React, { createContext, useContext, useState } from "react";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalContextProvider = (props) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        state: {
          isLoading,
          setLoading,
        },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
