import React from "react";

// Firebase
import { useFirebase } from "../../../context/Firebase.context";

// Components
import MovieBackground from "../standalone/MovieBackground";
import Google from "../../svgs/Google";

function AuthContainer(props) {
  const { isLogin } = props;
  const { signInWithGoogle } = useFirebase().functions;
  const authCallback = (user) => {
    console.log(user);
  };

  return (
    <div className="auth-container center">
      {/* Movie Background */}
      <MovieBackground url="https://image.tmdb.org/t/p/original/l6b9YZEokZl1nt7q0pprrur6btG.jpg" />

      {/* Auth Form */}
      <div className="auth-form row">
        {/* Left Side */}
        <div className="auth-form__left">
          <h2 className="auth-form__title">
            {isLogin ? "Log in to your Account" : "Create an Account"}
          </h2>

          {/* Main Form */}
          {props.children}
        </div>

        {/* Right Side */}
        <div className="auth-form__right center-vertical">
          <div className="auth-form__logo center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
              alt="MyMovieList"
            />
          </div>
          <hr />
          <h2 className="auth-form__sub-title between-row">
            Other Ways to {isLogin ? "Log In" : "Sign Up"}
          </h2>
          <button
            className="auth-form__google center"
            onClick={() => signInWithGoogle(authCallback)}
          >
            <Google /> Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
