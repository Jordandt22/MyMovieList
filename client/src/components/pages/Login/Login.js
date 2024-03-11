import React from "react";

// Context
import { useFirebase } from "../../../context/Firebase.context";

// Components
import AuthContainer from "../../layout/Auth/AuthContainer";
import AuthForm from "../../layout/Auth/AuthForm";

function Login() {
  const { signInEmailUser } = useFirebase().functions;

  return (
    <div className="login-page">
      <AuthContainer isLogin={true}>
        <AuthForm
          isLogin={true}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, formCallback) => {
            const { email, password } = values;

            // Log In Email User
            signInEmailUser(email, password, (user, error) => {
              const { accessToken, uid } = user;

              // Get user information from Database
              console.log(user);

              formCallback();
            });
          }}
          inputs={[
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "Ex: Example@gmail.com",
            },
            {
              name: "password",
              type: "password",
              label: "Password",
              placeholder: "Ex: Password#1234",
            },
          ]}
        />
      </AuthContainer>
    </div>
  );
}

export default Login;
