import React, { useState } from "react";
import { Formik } from "formik";

// Schemas
import { ProfilePictureSchema } from "../../../schemas/User.schemas";

// Contexts
import { useAPI } from "../../../context/data/API.context";
import { useAuth } from "../../../context/auth/Auth.context";
import { useGlobal } from "../../../context/state/Global.context";
import { useUser } from "../../../context/state/User.context";

function ImageFileInputPopup(props) {
  const { setShowImageFileInput } = props;
  const { setLoading } = useGlobal().state;
  const { uid, acccessToken } = useAuth().authState;
  const { updateProfilePicture } = useAPI().user;
  const { updateProfilePicture: updateContextProfilePic } = useUser();

  // Preview Image
  const [preview, setPreview] = useState(null);

  return (
    <div className="imgFileInput-popup center">
      <Formik
        initialValues={{ profilePicture: "" }}
        validationSchema={ProfilePictureSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { profilePicture } = values;
          console.log(profilePicture);
          resetForm();
          setShowImageFileInput(false);
          // setLoading(true);
          // setSubmitting(true);
          // updateProfilePicture(
          //   uid,
          //   acccessToken,
          //   profilePicture,
          //   (res, APIError) => {
          //     if (APIError) return console.log(APIError);

          //     // Update Context
          //     console.log(res);
          //     updateContextProfilePic(profilePicture);
          //     resetForm();
          //     setSubmitting(false);
          //     setShowImageFileInput(false);
          //     setLoading(false);
          //   }
          // );
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="imgFileInput-popup__box center-vertical">
              <h1 className="imgFileInput-popup__title">
                Choose a new Profile Picture!
              </h1>

              {/* Input */}
              <div className="imgFileInput-popup__input-box center-vertical">
                {props.values.profilePicture ? (
                  <div className="center-vertical">
                    <img
                      src={preview}
                      className="imgFileInput-popup__preview"
                      alt="Input Preview"
                    />
                    <p className="imgFileInput-popup__preview-name">
                      {props.values.profilePicture.name}
                    </p>
                  </div>
                ) : (
                  <div className="imgFileInput-popup__empty center">None</div>
                )}
                <label className="imgFileInput-popup__input">
                  <input
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      props.setFieldValue("profilePicture", file);

                      const reader = new FileReader();
                      if (file) reader.readAsDataURL(file);

                      reader.onload = () => {
                        if (file && file["type"].split("/")[0] === "image")
                          setPreview(reader.result);
                      };
                    }}
                    onBlur={props.handleBlur}
                    // value={props.values.profilePicture}
                    type="file"
                    name="profilePicture"
                    accept="image/jpeg, image/png, image/jpg"
                  />
                  Choose File
                </label>
              </div>

              {/* Buttons */}
              <div className="between-row">
                <button type="submit" className="imgFileInput-popup__save">
                  Save
                </button>
                <button
                  type="button"
                  className="imgFileInput-popup__cancel"
                  onClick={() => setShowImageFileInput(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ImageFileInputPopup;
