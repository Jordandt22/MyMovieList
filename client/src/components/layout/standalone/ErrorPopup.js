import React from "react";

// Components
import Error from "../../svgs/Error";
import { NavLink } from "react-router-dom";

function ErrorPopup(props) {
  const { message } = props;

  return (
    <div className="error-popup center">
      <div className="error-popup__box center-vertical">
        <Error />
        <h3 className="error-popup__title">Error Message!</h3>
        <p className="error-popup__message">{message}</p>
        <NavLink className="error-popup__link" to="/">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPopup;
