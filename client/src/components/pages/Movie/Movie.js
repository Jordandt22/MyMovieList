import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Contexts
import { useTMDB } from "../../../context/data/Tmdb.context";

// Components
import Loading from "../../layout/standalone/Loading";

function Movie(props) {
  const { movieID } = useParams();
  const { getMovieByID } = useTMDB().API;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["MOVIE_ID:" + movieID, movieID],
    queryFn: ({ queryKey }) => getMovieByID(queryKey[1]),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  console.log(data);
  return <div>Movie</div>;
}

export default Movie;
