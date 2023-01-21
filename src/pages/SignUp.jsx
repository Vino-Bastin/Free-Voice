import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Formik } from "formik";
import * as yup from "yup";

import GoogleIcon from "@mui/icons-material/Google";
import { useColors } from "../theme/Theme";

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
  const colors = useColors();
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="50%"
        height="70%"
        borderRadius="10px"
        p="2%"
        backgroundColor={colors.secondary[600]}
      >
        <Typography
          variant="h2"
          fontStyle="italic"
          align="center"
          color={colors.primary[500]}
        >
          Free Voice
        </Typography>
        <Typography variant="h6" align="center" mt="5px">
          Welcome to Free Voice
        </Typography>
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
            <form onSubmit={handleSubmit} autoComplete="off">
              {signUpFormInput.map((value) => (
                <TextField
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
              <Box textAlign="center" m="3% 0%">
                <Button>
                  <Typography variant="h6">Create A New Account</Typography>
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Box width="75%">
          <Divider variant="fullWidth">OR</Divider>
        </Box>
        <Box textAlign="center" mt="2%">
          <Button>
            <GoogleIcon />
            <Typography variant="h6" ml="5px">
              Sign Up With Google
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
