import React from "react";

// Contexts
import { useUser } from "../../../context/state/User.context";

// Components
import MovieCardQuery from "./MovieCardQuery";

function MovieList() {
  const {
    user: { username, ratedMovies },
  } = useUser();
  const sortedRatedMovies = ratedMovies.sort((a, b) => b.rating - a.rating);

  return (
    <div className="list-page">
      <h1 className="list-page__title">
        <span>{username}</span>'s Movies
      </h1>
      {/* Movies */}
      <div className="movies-container">
        {sortedRatedMovies.map((movie) => {
          const { movieID, rating } = movie;

          return (
            <MovieCardQuery key={movieID} movieID={movieID} rating={rating} />
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;
