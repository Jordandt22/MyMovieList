import React from "react";

// Firebase
import { useFirebase } from "../../../context/auth/Firebase.context";

// Components
import MovieBackground from "../standalone/MovieBackground";
import Google from "../../svgs/Google";

// Contexts
import { useAPI } from "../../../context/data/API.context";
import { updateCurrentUser } from "firebase/auth";
import { useAuth } from "../../../context/auth/Auth.context";

function AuthContainer(props) {
  const { isLogin } = props;
  const { signInWithGoogle } = useFirebase().functions;
  const { getDBUser } = useAPI().auth;
  const { authenticateUser } = useAuth();

  const authCallback = async (user, error) => {
    if (!user || error) return console.log(error);

    const { uid, accessToken } = user;
    // Get Information from Database
    await getDBUser(uid, accessToken, (res, APIError) => {
      if (APIError) return console.log(APIError);

      // Update User State
      const { email, username } = res.data.user;
      updateCurrentUser({ uid, email, username });

      // Finish Auth Process
      authenticateUser(accessToken, uid);
    });
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
