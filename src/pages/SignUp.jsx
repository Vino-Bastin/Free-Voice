import React, { useContext, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { selectLoading, setLoading } from "../store/Loading";
import { auth, db } from "../firebase/firebase";
import { AuthContext } from "../firebase/AuthProvider";
import { uploadProfilePhoto } from "../firebase/firestore";

import Logo from "../Components/Logo";
import AuthContainer from "../Components/Auth/AuthContainer";
import GoogleAuth from "../Components/Auth/GoogleAuth";
import AuthNavigator from "../Components/Auth/AuthNavigator";

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
  const { setUser } = useContext(AuthContext);
  const profilePhoto = useRef(null);
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  // * creating a new user with email and password
  const handleSubmit = async (values, { setErrors }) => {
    let profilePhotoUrl = "";
    try {
      dispatch(setLoading(true));
      // * creating a new user with email and password
      const authResponse = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      //* uploading profile photo to firebase storage
      profilePhotoUrl = await uploadProfilePhoto(
        authResponse.user.uid,
        profilePhoto.current.files[0]
      );
      // * creating a new user document in firestore
      await setDoc(doc(db, "users", authResponse.user.uid), {
        displayName: values.displayName,
        email: values.email,
        photoUrl: profilePhotoUrl,
        createAt: serverTimestamp(),
        status: "online",
      });
      // * setting user in context
      setUser({
        uid: authResponse.user.uid,
        displayName: values.displayName,
        email: values.email,
        photoUrl: profilePhotoUrl,
      });
      // * redirecting to home page
      navigate("/");
    } catch (error) {
      // * handling error
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use" });
      } else if (error.code === "auth/invalid-email") {
        setErrors({ email: "Invalid email" });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: "Password must be at least 8 characters" });
      }
      console.error(error);
    } finally {
      dispatch(setLoading(false));
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

              {/* profile photo input  */}
              <Box textAlign="center">
                <Button component="label">
                  Choice Profile Photo
                  <input
                    ref={profilePhoto}
                    type="file"
                    name="profilePhoto"
                    hidden
                    accept="image/jpg, image/jpeg, image/png"
                  />
                </Button>
              </Box>

              {/* signup button and loading spinner */}
              <Box textAlign="center" m="3% 0%">
                {!loading ? (
                  <Button type="submit">
                    <Typography variant="h6">Create A New Account</Typography>
                  </Button>
                ) : (
                  <CircularProgress
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                )}
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
