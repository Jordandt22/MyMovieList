import React from "react";
import { useState } from "react";
import axios from 'axios'

// Contexts
import { useFirebase } from "../../../context/Firebase.context";

// Components
import AuthContainer from "../../layout/Auth/AuthContainer";
import AuthForm from "../../layout/Auth/AuthForm";

function Signup() {
  const { createEmailUser } = useFirebase().functions;
  const [error, setError] = useState(null);

  const [setEmail] = useState('')
  const [setUsername] = useState('')
  const [setPassword] = useState('')
  const [setConfirmPassword] = useState('')

  const handleSubmit = async (values, formCallback) => {
    console.log("handleSubmit function is triggered!");
   
    

    
    const { email, username, password, confirmPassword } = values;

    const data = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }

    axios.post('http://localhost:3001/signup', data)
    .then(result => {
      console.log(result);
      // Handle successful response
    })
    .catch(err => {
      console.log(err);
      // Handle error
    });

    try {
      // Create Email User
      
      const user = await createEmailUser(email, password);

      // Handle successful user creation
      console.log("User created:", user);

      // Optionally, perform any additional actions after user creation

      formCallback(); // Clear form fields
      setError(null); // Clear any previous errors
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again."); // Display error message to the user
    }
  };

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
          // onSubmit={(values, formCallback) => {
          //   const { username, email, password } = values;

          //   // Create Email User
          //   createEmailUser(email, password, (user, error) => {
          //     const { accessToken, uid } = user;

          //     // Create User in  Database
          //     console.log(user);

          //     formCallback();
          //   });
          // }}
          onSubmit={handleSubmit}
          inputs={[
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "Ex: Example@gmail.com",
              onChange: (e) => setEmail(e.target.value),
            },
            {
              name: "username",
              type: "text",
              label: "Username",
              placeholder: "Ex: MyUsername22",
              onChange: (e) => setUsername(e.target.value),
            },
            {
              name: "password",
              type: "password",
              label: "Create a Password",
              placeholder: "Ex: Password#1234",
              onChange: (e) => setPassword(e.target.value),
            },
            {
              name: "confirmPassword",
              type: "password",
              label: "Confirm your Password",
              placeholder: "Ex: Password#1234",
              onChange: (e) => setConfirmPassword(e.target.value),
            },
          ]}
        />
      </AuthContainer>
    </div>
  );
}

export default Signup;
