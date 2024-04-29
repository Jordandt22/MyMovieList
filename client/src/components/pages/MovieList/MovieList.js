import React, { useState } from "react";

// Contexts
import { useUser } from "../../../context/state/User.context";

// Components
import MovieCardQuery from "./MovieCardQuery";
import MovieRatingPopup from "../../layout/Movies/MovieRatingPopup";

function MovieList() {
  const {
    user: { username, ratedMovies },
  } = useUser();
  const sortedRatedMovies = ratedMovies.sort((a, b) => b.rating - a.rating);

  // Movie Popup
  const [moviePopup, setMoviePopup] = useState({
    show: false,
    movie: null,
  });

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
            <MovieCardQuery
              key={movieID}
              movieID={movieID}
              rating={rating}
              setMoviePopup={setMoviePopup}
            />
          );
        })}
      </div>

      {/* Movie Rating Popup */}
      {moviePopup.show && (
        <MovieRatingPopup
          movie={moviePopup.movie}
          setMoviePopup={setMoviePopup}
          isEditPopup={true}
        />
      )}
    </div>
  );
}

export default MovieList;
