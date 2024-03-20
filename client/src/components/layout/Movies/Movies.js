import React from "react";

// Components
import MovieCard from "./MovieCard";

function Movies(props) {
  const { movies } = props;

  return (
    <div className="movies-list">
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
}

export default Movies;
