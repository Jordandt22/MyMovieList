import React from "react";

function MovieBackground(props) {
  return (
    <div className="movie-background">
      <img src={props.url} alt="Movie Background" />
    </div>
  );
}

export default MovieBackground;
