import React from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { useAuth } from "../../../context/Auth.context";
import { useFirebase } from "../../../context/Firebase.context";

// Components
import Search from "../../svgs/Search";
import User from "../../svgs/User";

function Navbar() {
  const { isAuth } = useAuth().authState;
  const { logoutFirebaseUser } = useFirebase().functions;
  const links = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Top Rated",
      path: "/top",
    },
    {
      label: "Trending",
      path: "/trending",
    },
    {
      label: "Upcoming",
      path: "/upcoming",
    },
    {
      label: "Recommendations",
      path: "/recommendations",
    },
  ];

  return (
    <div className="navbar between-row">
      <div className="row">
        <h1 className="navbar__title">
          My<span>Movie</span>List
        </h1>

        {/* Links */}
        {links.map((link) => {
          return (
            <NavLink key={link.label} className="navbar__link" to={link.path}>
              {link.label}
            </NavLink>
          );
        })}
      </div>

      <div className="row">
        <button className="navbar__search-btn center">
          <Search />
        </button>
        {isAuth ? (
          <button
            className="navbar__profile center"
            onClick={logoutFirebaseUser}
          >
            {/* ---- Change onClick ---- */}
            <User />
          </button>
        ) : (
          <NavLink to="/login" className="navbar__login">
            Log In
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
