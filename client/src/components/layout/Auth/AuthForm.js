import React from "react";
import { Formik } from "formik";

// Contexts
import { useGlobal } from "../../../context/Global.context";

// Schemas
import { LoginSchema, SignupSchema } from "../../../schemas/Auth.schemas";

// Components
import Error from "../../svgs/Error";

function AuthForm(props) {
  const { isLogin, initialValues, onSubmit, inputs } = props;
  const { setLoading } = useGlobal().state;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isLogin ? LoginSchema : SignupSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setLoading(true);
        onSubmit(values, () => {
          resetForm();
          setSubmitting(false);
          setLoading(false);
        });
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {inputs.map((inputInfo) => {
            const { name, type, label, placeholder } = inputInfo;
            const isError = props.errors[name] && props.touched[name];

            return (
              <div
                key={name}
                className={`auth-form__input-box ${
                  isError ? "auth-form__error-box" : ""
                }`}
              >
                {/* Label */}
                <label htmlFor={name}>{label}</label>

                {/* Input */}
                <input
                  type={type}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values[name]}
                  name={name}
                  placeholder={placeholder}
                  autoComplete="off"
                />

                {/* Error Mesasge */}
                {isError && (
                  <p className="auth-form__error row">
                    <Error />
                    {props.errors[name]}
                  </p>
                )}
              </div>
            );
          })}

          <div className="center-vertical">
            <button type="submit" className="auth-form__submit">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default AuthForm;
