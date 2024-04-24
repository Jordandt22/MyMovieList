import React from "react";

// Components
import MovieCard from "./MovieCard";

function Movies(props) {
  const { movies, setMoviePopup } = props;

  return (
    <div className="movies-list">
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            setMoviePopup={setMoviePopup}
          />
        );
      })}
    </div>
  );
}

export default Movies;
