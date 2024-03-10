import React from "react";
import { NavLink } from "react-router-dom";
import date from "date-and-time";

// Contexts
import { useTMDB } from "../../../context/Tmdb.context";
import CirclePlus from "../../svgs/CirclePlus";

function HeroContent(props) {
  const {
    movie: { id, backdrop_path, title, release_date },
  } = props;
  const { getTMDBImageURL } = useTMDB();
  const year = release_date.split("-")[0];
  const month = release_date.split("-")[1];
  const day = release_date.split("-")[2];
  const parsedDate = date.format(
    date.parse(`${day}-${month}-${year}`, "DD-MM-YYYY"),
    "MMM. DD, YYYY"
  );

  return (
    <div
      className="hero-content"
      style={{
        backgroundImage: `url(${getTMDBImageURL(backdrop_path)})`,
      }}
    >
      <div className="hero__movie-info row">
        <p className="hero__release-date">Now Playing - {parsedDate}</p>
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
