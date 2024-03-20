import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";

// Contexts
import { useTMDB } from "../../../context/Tmdb.context";
import { useUtil } from "../../../context/Util.context";

// Components
import HeroContent from "./HeroContent";
import Loading from "../../layout/standalone/Loading";

function Home() {
  const { sortMovies } = useUtil();
  const { getNowPlayingMovies } = useTMDB().API;
  const [active, setActive] = useState(0);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["NOW_PLAYING_MOVIES"],
    queryFn: getNowPlayingMovies,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>{error.message}</div>;
  }

  const movies = sortMovies(data.results);
  return (
    <div className="home-page">
      {/* <div class="hero-container">
      {movies.map((movie, i) => {
        return <HeroContent movie={movie} />;
      })}
      </div> */}
      <HeroContent movie={movies[0]} />
    </div>
  );
}

export default Home;
