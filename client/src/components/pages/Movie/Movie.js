import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Contexts
import { useTMDB } from "../../../context/data/Tmdb.context";

// Components
import Loading from "../../layout/standalone/Loading";
import ErrorPopup from "../../layout/standalone/ErrorPopup";

function Movie() {
  const { movieID } = useParams();
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

  console.log(data);
  return <div>Movie</div>;
}

export default Movie;
