import React, { createContext, useContext, useState } from "react";

// Contexts
import { useAuth } from "../auth/Auth.context";

// User Context
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserContextProvider = (props) => {
  const { isAuth } = useAuth().authState;
  const [user, setUser] = useState({
    uid: null,
    username: "",
    email: "",
    ratedMovies: [],
    profilePicture: null,
  });

  // Update User
  const updateUser = (data) => setUser((oldUser) => ({ ...oldUser, ...data }));

  // Update Rated Movies List
  const updateRatedMovies = (updatedList) =>
    setUser((oldUser) => ({ ...oldUser, ratedMovies: updatedList }));

  // Check if Rated Movies contains a specific Movie
  const checkRatedMovies = (movieID) => {
    if (!isAuth) return { alreadyRated: false, movie: null };

    // Specific Movie
    const movie = user.ratedMovies.filter(
      (ratedMovie) => ratedMovie.movieID === movieID.toString()
    )[0];

    return movie
      ? {
          alreadyRated: true,
          movie,
        }
      : {
          alreadyRated: false,
          movie: null,
        };
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, updateRatedMovies, checkRatedMovies }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
