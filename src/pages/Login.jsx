import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/firebase";
import AuthContainer from "../Components/AuthContainer";
import Logo from "../Components/Logo";
import GoogleAuth from "../Components/GoogleAuth";
import AuthNavigator from "../Components/AuthNavigator";

const initialFormState = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const loginFormInput = [
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

const Login = () => {
  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found")
        setErrors({ email: "User not found" });
      else if (error.code === "auth/wrong-password")
        setErrors({ password: "Wrong password" });
      else setErrors({ email: error.message });
    }
  };

  return (
    <AuthContainer>
      {/* Logo and subtitle */}
      <Logo />

      {/* login form */}
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
          handleSubmit,
          handleBlur,
        }) => (
          <Box width="75%">
            <form onSubmit={handleSubmit} autoComplete="off">
              {loginFormInput.map((value) => (
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
                  <Typography variant="h6">Login</Typography>
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

      {/* login with google */}
      <GoogleAuth isLogin />

      {/* sign up navigator */}
      <AuthNavigator />
    </AuthContainer>
  );
};

export default Login;
