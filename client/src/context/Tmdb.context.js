import React, { createContext, useContext } from "react";
import axios from "axios";

const TMDBContext = createContext();
export const useTMDB = () => useContext(TMDBContext);
export const TMDBContextProvider = (props) => {
  const TMDB_URL = "https://api.themoviedb.org/3";
  const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original";
  const getTMDBImageURL = (path) => TMDB_IMG_URL + path;

  // Setting Access Token
  axios.defaults.headers.get.Authorization =
    "Bearer " + process.env.REACT_APP_TMDB_ACCESS_TOKEN;

  // GET - Trending Movies
  const getTrendingMovies = () =>
    axios
      .get(TMDB_URL + "/trending/movie/day?language=en-US")
      .then((res) => res.data);

  // GET - Now Playing Movies
  const getNowPlayingMovies = () =>
    axios.get(TMDB_URL + "/movie/now_playing").then((res) => res.data);

  // GET - Query Movies
  const getSearchedMovies = (query) =>
    axios
      .get(TMDB_URL + `/search/movie?query=${query}`)
      .then((res) => res.data);

  return (
    <TMDBContext.Provider
      value={{
        getTMDBImageURL,
        API: { getTrendingMovies, getNowPlayingMovies, getSearchedMovies },
      }}
    >
      {props.children}
    </TMDBContext.Provider>
  );
};
