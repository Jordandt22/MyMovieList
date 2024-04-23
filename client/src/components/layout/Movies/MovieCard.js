import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Contexts
import { useUtil } from "../../../context/state/Util.context";
import { useTMDB } from "../../../context/data/Tmdb.context";
import { useUser } from "../../../context/state/User.context";
import { useAuth } from "../../../context/auth/Auth.context";

// Components
import CirclePlus from "../../svgs/CirclePlus";
import Star from "../../svgs/Star";

function MovieCard(props) {
  const { movie, setMoviePopup } = props;
  const { id, backdrop_path, title, release_date } = movie;
  const navigate = useNavigate();
  const { parseDate } = useUtil();
  const { isAuth } = useAuth().authState;
  const { getTMDBImageURL } = useTMDB();
  const { checkRatedMovies } = useUser();
  const { alreadyRated, movie: userMovieData } = checkRatedMovies(id);

  return (
    <div className="movie-card center-vertical">
      <div className="movie-card__info-box">
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
          {alreadyRated ? (
            <p className="movie-card__rating center">
              <Star />
              {userMovieData.rating}/10
            </p>
          ) : (
            <button
              type="button"
              className="movie-card__add"
              onClick={() => {
                if (isAuth) {
                  setMoviePopup({
                    show: true,
                    movie: props.movie,
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <CirclePlus />
            </button>
          )}
        </div>
      </div>
      <NavLink to={`/movie/${id}`} className="movie-card__sub-title">
        {title}
      </NavLink>
    </div>
  );
}

export default MovieCard;
