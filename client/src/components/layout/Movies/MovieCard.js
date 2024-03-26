import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useUtil } from "../../../context/state/Util.context";
import { useTMDB } from "../../../context/data/Tmdb.context";

// Components
import CirclePlus from "../../svgs/CirclePlus";

function MovieCard(props) {
  const { movie } = props;
  const { id, backdrop_path, title, release_date } = movie;
  const { parseDate } = useUtil();
  const { getTMDBImageURL } = useTMDB();

  return (
    <div className="movie-card center-vertical">
      <div
        className="movie-card__info-box"
        onClick={() => console.log("Add " + id)}
      >
        <object
          data={getTMDBImageURL(backdrop_path)}
          className="movie-card__img"
          type="image/jpg"
        >
          <div className="movie-card__fallback-img center">
            404 - Image Unavailable
          </div>
        </object>

        <div className="movie-card__info center">
          <h2 className="movie-card__title">{title}</h2>
          <p className="movie-card__date">{parseDate(release_date)}</p>
          <CirclePlus />
        </div>
      </div>
      <NavLink to={`/movie/${id}`} className="movie-card__sub-title">
        {title}
      </NavLink>
    </div>
  );
}

export default MovieCard;
