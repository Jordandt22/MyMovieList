import React from "react";

// Contexts
import { useFirebase } from "../../../context/Firebase.context";

// Components
import AuthContainer from "../../layout/Auth/AuthContainer";
import AuthForm from "../../layout/Auth/AuthForm";

function Signup() {
  const { createEmailUser } = useFirebase().functions;

  return (
    <div className="signup-page">
      <AuthContainer isLogin={false}>
        <AuthForm
          isLogin={false}
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, formCallback) => {
            const { username, email, password } = values;

            // Create Email User
            createEmailUser(email, password, (user, error) => {
              const { accessToken, uid } = user;

              // Create User in  Database
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
              name: "username",
              type: "text",
              label: "Username",
              placeholder: "Ex: MyUsername22",
            },
            {
              name: "password",
              type: "password",
              label: "Create a Password",
              placeholder: "Ex: Password#1234",
            },
            {
              name: "confirmPassword",
              type: "password",
              label: "Confirm your Password",
              placeholder: "Ex: Password#1234",
            },
          ]}
        />
      </AuthContainer>
    </div>
  );
}

export default Signup;
