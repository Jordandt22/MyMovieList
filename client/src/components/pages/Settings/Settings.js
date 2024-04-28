import React, { useState } from "react";

// Contexts
import { useUser } from "../../../context/state/User.context";

// Components
import Email from "../../svgs/Email";
import User from "../../svgs/User";
import WarningPopup from "./WarningPopup";
import ImageFileInputPopup from "./ImageFileInputPopup";

function Settings() {
  const {
    user: { email, username, profilePicture },
  } = useUser();

  // Warning Popup
  const [showWarning, setShowWarning] = useState(false);

  // Image File Input Popup
  const [showImageFileInput, setShowImageFileInput] = useState(false);

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
            <button
              type="button"
              className="user-info__edit"
              onClick={() => setShowImageFileInput(true)}
            >
              {profilePicture ? "Edit" : "Add"} Photo
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
      {showWarning && <WarningPopup setShowWarning={setShowWarning} />}

      {/* Image File Input Popup */}
      {showImageFileInput && (
        <ImageFileInputPopup setShowImageFileInput={setShowImageFileInput} />
      )}
    </div>
  );
}

export default Settings;
