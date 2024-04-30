import React from "react";
import { Formik } from "formik";

// Schemas
import { UsernameSchema } from "../../../schemas/User.schemas";

// Components
import Error from "../../svgs/Error";

function EditUsernamePopup(props) {
  const { setShowEditPopup } = props;

  return (
    <div className="edit-popup center">
      <Formik
        initialValues={{ username: "" }}
        validationSchema={UsernameSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { username } = values;
          console.log(username);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="edit-popup__box center-vertical">
              <h1 className="edit-popup__title">Edit your username!</h1>

              {/* Input */}
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
                name="username"
                placeholder="Ex: MyNewUsername"
                autoComplete="off"
              />

              {/* Error Mesasge */}
              {props.errors.username && props.touched.username && (
                <p className="edit-popup__error row">
                  <Error />
                  {props.errors.username}
                </p>
              )}

              {/* Buttons */}
              <div className="edit-popup__btns between-row">
                <button type="submit" className="edit-popup__save">
                  Save
                </button>
                <button
                  type="button"
                  className="edit-popup__cancel"
                  onClick={() => setShowEditPopup(false)}
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

export default EditUsernamePopup;
