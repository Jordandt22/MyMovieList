import React, { createContext, useContext } from "react";
import axios from "axios";

const TMDBContext = createContext();
export const useTMDB = () => useContext(TMDBContext);
export const TMDBContextProvider = (props) => {
  const TMDB_URL = "https://api.themoviedb.org/3";
  const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original";
  const getTMDBImageURL = (path) => TMDB_IMG_URL + path;
  const getTMDBAPIURL = (path) => TMDB_URL + path + "?language=en-US";

  // Setting Access Token
  axios.defaults.headers.get.Authorization =
    "Bearer " + process.env.REACT_APP_TMDB_ACCESS_TOKEN;

  // GET - Trending Movies
  const getTrendingMovies = (page) =>
    axios
      .get(getTMDBAPIURL("/trending/movie/day") + `&page=${page}`)
      .then((res) => res.data)
      .catch((error) => error);

  // GET - Now Playing Movies
  const getNowPlayingMovies = () =>
    axios
      .get(getTMDBAPIURL("/movie/now_playing"))
      .then((res) => res.data)
      .catch((error) => error);

  // GET - Query Movies
  const getSearchedMovies = (query, page) =>
    axios
      .get(getTMDBAPIURL("/search/movie") + `&query=${query}&page=${page}`)
      .then((res) => res.data)
      .catch((error) => error);

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
