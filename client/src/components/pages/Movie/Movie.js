import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Contexts
import { useTMDB } from "../../../context/data/Tmdb.context";

// Components
import Loading from "../../layout/standalone/Loading";
import ErrorPopup from "../../layout/standalone/ErrorPopup";
import MovieBackground from "../../layout/standalone/MovieBackground";
import MovieDetails from "./MovieDetails";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";

function Movie() {
  const { movieID } = useParams();
  const { getTMDBImageURL } = useTMDB();
  const { getMovieByID } = useTMDB().API;
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`MOVIE?ID:${movieID}`, movieID],
    queryFn: ({ queryKey }) => getMovieByID(queryKey[1]),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return <ErrorPopup message={error.message} />;
  }

  return (
    <div className="movie-page">
      <MovieBackground url={getTMDBImageURL(data.backdrop_path)} />
      <MovieDetails data={data} />
      <MovieCast data={data} />
      <SimilarMovies data={data} />
    </div>
  );
}

export default Movie;
