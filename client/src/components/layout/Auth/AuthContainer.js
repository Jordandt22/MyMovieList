import React from "react";
import { NavLink } from "react-router-dom";

// Components
import MovieBackground from "../standalone/MovieBackground";

function AuthContainer(props) {
  const { isLogin } = props;

  return (
    <div className="auth-container center">
      {/* Movie Background */}
      <MovieBackground url="https://image.tmdb.org/t/p/original/l6b9YZEokZl1nt7q0pprrur6btG.jpg" />

      {/* Auth Form */}
      <div className="auth-form">
        {/* Logo */}
        <div className="auth-form__logo center">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            alt="MyMovieList"
          />
        </div>
        <h2 className="auth-form__title">
          {isLogin ? "Already have an Account?" : "Don't have an Account?"}
        </h2>

        {/* Main Form */}
        {props.children}

        {/* Links */}
        <div className="center-vertical">
          {isLogin ? (
            <NavLink to="/signup" className="auth-form__link">
              Don't have an account yet? <span>Sign Up</span>
            </NavLink>
          ) : (
            <NavLink to="/login" className="auth-form__link">
              Already have an account? <span>Log In</span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
