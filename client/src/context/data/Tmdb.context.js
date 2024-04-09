import React, { createContext, useContext } from "react";
import axios from "axios";

const TMDBContext = createContext();
export const useTMDB = () => useContext(TMDBContext);
export const TMDBContextProvider = (props) => {
  const { REACT_APP_TMDB_ACCESS_TOKEN } = process.env;
  const TMDB_URL = "https://api.themoviedb.org/3";
  const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original";
  const getTMDBImageURL = (path) => TMDB_IMG_URL + path;
  const getTMDBAPIURL = (path, params) =>
    TMDB_URL + path + "?language=en-US" + params;

  // Setting Access Token
  const config = {
    headers: {
      Authorization: `Bearer ${REACT_APP_TMDB_ACCESS_TOKEN}`,
    },
  };

  // Error Handler
  const errorHandler = (error) => {
    const APIMessage = error?.response?.data?.status_message;
    throw new Error(
      APIMessage
        ? APIMessage
        : "Oops, something went wrong! Please try again later."
    );
  };

  // GET - Trending Movies
  const getTrendingMovies = (page) =>
    axios
      .get(getTMDBAPIURL("/trending/movie/day", `&page=${page}`), config)
      .then((res) => res.data)
      .catch((error) => errorHandler(error));

  // GET - Top Rated Movies
  const getTopRatedMovies = (page) =>
    axios
      .get(getTMDBAPIURL(`/movie/top_rated`, `S&page=${page}`), config)
      .then((res) => res.data)
      .catch((error) => errorHandler(error));

  // GET - Upcoming Movies
  const getUpcomingMovies = (page) =>
    axios
      .get(getTMDBAPIURL(`/movie/upcoming`, `S&page=${page}`), config)
      .then((res) => res.data)
      .catch((error) => errorHandler(error));

  // GET - Now Playing Movies
  const getNowPlayingMovies = () =>
    axios
      .get(getTMDBAPIURL("/movie/now_playing", ""), config)
      .then((res) => res.data)
      .catch((error) => errorHandler(error));

  // GET - Query Movies
  const getSearchedMovies = (query, page) =>
    axios
      .get(
        getTMDBAPIURL("/search/movie", `&query=${query}&page=${page}`),
        config
      )
      .then((res) => res.data)
      .catch((error) => errorHandler(error));

  // GET - Movie by ID
  const getMovieByID = (movieID) =>
    axios
      .get(getTMDBAPIURL(`/movie/${movieID}`, ""), config)
      .then((res) => res.data)
      .catch((error) => errorHandler(error));

  return (
    <TMDBContext.Provider
      value={{
        getTMDBImageURL,
        API: {
          getTrendingMovies,
          getNowPlayingMovies,
          getSearchedMovies,
          getMovieByID,
          getTopRatedMovies,
          getUpcomingMovies,
        },
      }}
    >
      {props.children}
    </TMDBContext.Provider>
  );
};
