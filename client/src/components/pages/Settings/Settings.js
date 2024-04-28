import React, { useState } from "react";

// Contexts
import { useUser } from "../../../context/state/User.context";
import { useAPI } from "../../../context/data/API.context";
import { useFirebase } from "../../../context/auth/Firebase.context";
import { useAuth } from "../../../context/auth/Auth.context";
import { useGlobal } from "../../../context/state/Global.context";

// Components
import Email from "../../svgs/Email";
import User from "../../svgs/User";

function Settings() {
  const {
    user: { email, username, profilePicture },
  } = useUser();
  const { setLoading } = useGlobal().state;
  const { uid, accessToken } = useAuth().authState;
  const { deleteDBUser } = useAPI().user;
  const { deleteFirebaseUser } = useFirebase().functions;

  // Warning Popup
  const [showWarning, setShowWarning] = useState(false);

  // Delete User from Firebase and Database
  const deleteUserHandler = async () => {
    setLoading(true);
    await deleteDBUser(uid, accessToken, async (res, APIError) => {
      if (APIError) return console.log(APIError);

      await deleteFirebaseUser();

      // Reset
      setShowWarning(false);
      setLoading(false);
    });
  };

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">My Settings</h1>

      <main className="row">
        {/* User Info */}
        <div className="user-info">
          <h2 className="user-info__title">User Information</h2>
          <p className="user-info__text row">
            <User />
            <strong>Username: </strong>
            {username}
          </p>
          <div className="user-info__profilePic-box row">
            <div className="user-info__profilePic center">
              {!profilePicture ? "None" : "IMAGE HERE"}
            </div>
            <button type="button" className="user-info__edit">
              Edit Photo
            </button>
          </div>
        </div>

        <div className="right-side">
          {/* Auth Info */}
          <div className="auth-info">
            <h2 className="auth-info__title">Security Information</h2>
            <p className="auth-info__text row">
              <Email />
              <strong>Email: </strong>
              {email}
            </p>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <h2 className="user-actions__title">User Actions</h2>
            <p className="user-actions__desc">
              By clicking the "Delete User" button, all the data connected to
              your account will be deleted and lost forever.
            </p>
            <button
              type="button"
              className="user-actions__delete"
              onClick={() => setShowWarning(true)}
            >
              Delete User
            </button>
          </div>
        </div>
      </main>

      {/* Warning Popup */}
      {showWarning && (
        <div className="warning-popup center">
          <div className="warning-popup__box center-vertical">
            <h1 className="warning-popup__title">Are you sure?</h1>
            <p className="warning-popup__desc">
              By clicking the "Delete" button, all the data connected to your
              account will be deleted and lost forever.
            </p>
            <div className="between-row">
              <button
                type="button"
                className="warning-popup__delete"
                onClick={async () => await deleteUserHandler()}
              >
                Delete
              </button>
              <button
                type="button"
                className="warning-popup__cancel"
                onClick={() => setShowWarning(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
