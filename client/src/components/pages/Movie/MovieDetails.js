import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useTMDB } from "../../../context/data/Tmdb.context";
import { useUtil } from "../../../context/state/Util.context";

// Components
import Star from "../../svgs/Star";
import Money from "../../svgs/Money";
import Language from "../../svgs/Language";
import Globle from "../../svgs/Globle";
import FilmCamera from "../../svgs/FilmCamera";

function MovieDetails(props) {
  const { data } = props;
  const { getTMDBImageURL } = useTMDB();
  const { parseDate } = useUtil();
  const hours = Math.floor(data.runtime / 60);
  const minutes = data.runtime % 60;
  const roundedRating = Math.round(data.vote_average * 10) / 10;
  const formatMoney = (val) =>
    "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
  const stats = [
    { icon: <Star />, label: "Rating", value: `${roundedRating}/10` },
    {
      icon: <Money />,
      label: "Budget",
      value: `${formatMoney(data.budget)}`,
    },
    {
      icon: <Money />,
      label: "Revenue",
      value: `${formatMoney(data.revenue)}`,
    },
    {
      icon: <Language />,
      label: "Original Language",
      value: data.original_language.toUpperCase(),
    },
    {
      icon: <Globle />,
      label: "Production Country",
      value: data.production_countries[0].iso_3166_1,
    },
    {
      icon: <FilmCamera />,
      label: "Production Company",
      value: data.production_companies[0].name,
    },
  ];

  return (
    <div className="movie-details between-row">
      <main className="row">
        {/* Movie Poster */}
        <div className="movie-poster center-vertical">
          <img
            src={getTMDBImageURL(data.poster_path)}
            className="movie-poster__img"
            alt={data.title}
          />
          <p className="movie-poster__tagline">{data.tagline}</p>
        </div>

        <div className="main-details">
          {/* Movie Header */}

          <div className="movie-header">
            <h1 className="movie-header__title">{data.title}</h1>
            <p className="movie-header__subtitle">
              Duration: {hours}h {minutes}m
            </p>
            <p className="movie-header__subtitle">
              Release Date: {parseDate(data.release_date)}
            </p>
          </div>
          {/* Movie Overview */}
          <div className="movie-overview">
            <h2 className="movie-overview__title">Overview</h2>
            <p className="movie-overview__text">{data.overview}</p>
          </div>
          {/* Movie Genres */}
          <div className="movie-genres row">
            {data.genres.map((genre) => {
              const { id, name } = genre;
              return (
                <NavLink
                  key={"genre-" + id}
                  className="movie-genres__link"
                  to={`/genre/${id}`}
                >
                  {name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </main>

      {/* Movie Stats */}
      <div className="movie-stats">
        <h2 className="movie-stats__title">Movie Stats</h2>
        {stats.map((stat) => {
          const { icon, label, value } = stat;

          return (
            <div key={label} id={label} className="movie-stats__box row">
              {icon}
              <p className="movie-stats__info">
                {label}: <span>{value}</span>
              </p>
            </div>
          );
        })}
        <button type="button" className="movie-stats__btn">
          Add to List
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
