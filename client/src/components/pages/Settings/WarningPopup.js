import React from "react";

// Contexts
import { useAPI } from "../../../context/data/API.context";
import { useFirebase } from "../../../context/auth/Firebase.context";
import { useAuth } from "../../../context/auth/Auth.context";
import { useGlobal } from "../../../context/state/Global.context";

function WarningPopup(props) {
  const { setShowWarning } = props;
  const { setLoading } = useGlobal().state;
  const { uid, accessToken } = useAuth().authState;
  const { deleteDBUser } = useAPI().user;
  const { deleteFirebaseUser } = useFirebase().functions;

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
  );
}

export default WarningPopup;
