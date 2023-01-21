import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Formik } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import Logo from "../Components/Logo";
import AuthContainer from "../Components/AuthContainer";
import GoogleAuth from "../Components/GoogleAuth";
import AuthNavigator from "../Components/AuthNavigator";

const initialFormState = {
  displayName: "",
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const signUpFormInput = [
  {
    name: "displayName",
    label: "Display Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const SignUp = () => {
  // * creating a new user with email and password
  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await setDoc(doc(db, "users", response.user.uid), {
        displayName: values.displayName,
        email: values.email,
        photoUrl: response.user.photoURL,
        createAt: serverTimestamp(),
      });
    } catch (error) {
      setErrors({ email: error.customData._tokenResponse.error.message });
      console.error(error);
    }
  };

  // * signup page jsx
  return (
    <AuthContainer>
      {/* Logo and subtitle */}
      <Logo />

      {/* signup form */}
      <Formik
        initialValues={initialFormState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Box width="75%">
            <form onSubmit={handleSubmit} autoComplete="off">
              {signUpFormInput.map((value) => (
                <TextField
                  sx={{ marginBottom: "2%" }}
                  key={value.name}
                  type={value.type}
                  fullWidth
                  variant="standard"
                  label={value.label}
                  name={value.name}
                  value={values[value.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched[value.name] && Boolean(errors[value.name])}
                  helperText={touched[value.name] && errors[value.name]}
                />
              ))}
              <Box textAlign="center" mb="3%">
                <Button type="submit">
                  <Typography variant="h6">Create A New Account</Typography>
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Formik>

      {/* divider */}
      <Box width="75%">
        <Divider variant="fullWidth">OR</Divider>
      </Box>

      {/* signup with google */}
      <GoogleAuth />

      {/* login page link */}
      <AuthNavigator isLogin />
    </AuthContainer>
  );
};

export default SignUp;
