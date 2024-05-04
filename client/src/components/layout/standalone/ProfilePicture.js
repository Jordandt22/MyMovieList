import React from "react";

// Contexts
import { useAuth } from "../../../context/auth/Auth.context";
import { useUser } from "../../../context/state/User.context";

// Components
import User from "../../svgs/User";
import { useAPI } from "../../../context/data/API.context";

function ProfilePicture(props) {
  const { isAuth } = useAuth().authState;
  const {
    user: { profilePicture, username },
  } = useUser();
  const { getProfilePictureURL } = useAPI().user;

  if (isAuth && profilePicture) {
    return (
      <div className={`profile-pic__box ${props.className} center`}>
        <img
          src={getProfilePictureURL(profilePicture.name)}
          alt={username}
          className="profile-pic"
        />
      </div>
    );
  } else {
    return (
      <div className={`profile-pic__box ${props.className} center`}>
        <User />
      </div>
    );
  }
}

export default ProfilePicture;
