import React from "react";

// Contexts
import { useFirebase } from "../../../context/auth/Firebase.context";
import { useAPI } from "../../../context/data/API.context";
import { useAuth } from "../../../context/auth/Auth.context";

// Components
import AuthContainer from "../../layout/Auth/AuthContainer";
import AuthForm from "../../layout/Auth/AuthForm";

function Signup() {
  const { createEmailUser } = useFirebase().functions;
  const { signUpDBUser } = useAPI().auth;
  const { authenticateUser } = useAuth();

  return (
    <div className="signup-page">
      <AuthContainer isLogin={false}>
        <AuthForm
          isLogin={false}
          initialValues={{
            email: "Test22@gmail.com",
            username: "TestUsername22",
            password: "Password1234$",
            confirmPassword: "Password1234$",
          }}
          onSubmit={(values, formCallback) => {
            const { username, email, password } = values;

            // Create Email User
            createEmailUser(email, password, (user, firebaseError) => {
              if (firebaseError) {
                formCallback(firebaseError);
                return console.log(firebaseError);
              }

              // Successful Creation of Firebase User
              const { accessToken, uid } = user;

              // Create User in Database
              signUpDBUser(
                {
                  username,
                  email,
                  uid,
                },
                accessToken,
                (res, APIError) => {
                  if (APIError) {
                    formCallback(APIError);
                    return console.log(APIError);
                  }

                  // Finish Auth Process
                  authenticateUser(accessToken, uid);
                  formCallback(null);
                }
              );
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
