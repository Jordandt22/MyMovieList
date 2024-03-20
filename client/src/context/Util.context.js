import React, { createContext, useContext } from "react";
import date from "date-and-time";

// Util Context
const UtilContext = createContext();
export const useUtil = () => useContext(UtilContext);
export const UtilContextProvider = (props) => {
  const sortMovies = (movies) => {
    const sortedMovies = movies.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });

    return sortedMovies.slice(0, 10);
  };

  const parseDate = (unparsedDate) => {
    const year = unparsedDate.split("-")[0];
    const month = unparsedDate.split("-")[1];
    const day = unparsedDate.split("-")[2];
    return date.format(
      date.parse(`${day}-${month}-${year}`, "DD-MM-YYYY"),
      "MMM. DD, YYYY"
    );
  };

  return (
    <UtilContext.Provider value={{ sortMovies, parseDate }}>
      {props.children}
    </UtilContext.Provider>
  );
};
