import React from "react";

// Contexts
import { useAuth } from "../../../context/auth/Auth.context";
import { useUser } from "../../../context/state/User.context";

// Components
import User from "../../svgs/User";

function ProfilePicture(props) {
  const { isAuth } = useAuth().authState;
  const {
    user: { profilePicture, username },
  } = useUser();

  return (
    <div className={`profile-pic__box ${props.className} center`}>
      {isAuth && profilePicture ? (
        <img
          src={
            process.env.PUBLIC_URL +
            `/assets/images/profile-pictures/profilePic-${profilePicture}.webp`
          }
          alt={username}
          className="profile-pic"
        />
      ) : (
        <User />
      )}
    </div>
  );
}

export default ProfilePicture;
