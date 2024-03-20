import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useTMDB } from "../../../context/Tmdb.context";
import { useUtil } from "../../../context/Util.context";

// Componentss
import CirclePlus from "../../svgs/CirclePlus";

function HeroContent(props) {
  const {
    movie: { id, backdrop_path, title, release_date },
  } = props;
  const { parseDate } = useUtil();
  const { getTMDBImageURL } = useTMDB();

  return (
    <div
      className="hero-content"
      style={{
        backgroundImage: `url(${getTMDBImageURL(backdrop_path)})`,
      }}
    >
      <div className="hero__movie-info row">
        <p className="hero__release-date">
          Now Playing - {parseDate(release_date)}
        </p>
        <h1 className="hero__title">{title}</h1>
        <div className="row">
          <NavLink className="hero__link" to={`/movie/${id}`}>
            More Info
          </NavLink>
          <button type="button" className="hero__add row">
            <CirclePlus />
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
