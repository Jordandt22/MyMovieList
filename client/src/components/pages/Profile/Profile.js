import React from "react";

// Contexts
import { useUser } from "../../../context/state/User.context";

function Profile() {
  const { user } = useUser();
  console.log(user);

  return <div>Profile</div>;
}

export default Profile;
