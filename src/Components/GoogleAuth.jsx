import React from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { auth, db, googleProvider } from "../firebase/firebase";

import GoogleIcon from "@mui/icons-material/Google";

const GoogleAuth = ({ isLogin = false }) => {
  const navigate = useNavigate();

  //* sign in with google
  const handleGoogleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", response.user.uid), {
        displayName: response.user.displayName,
        email: response.user.email,
        photoUrl: response.user.photoURL,
        createAt: response.user.metadata.creationTime,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box textAlign="center" mt="2%">
      <Button onClick={handleGoogleSignUp}>
        <GoogleIcon />
        <Typography variant="h6" ml="5px">
          {isLogin ? "Sign In with Google" : "Sign Up With Google"}
        </Typography>
      </Button>
    </Box>
  );
};

export default GoogleAuth;
