import React from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";

import { auth, db, googleProvider } from "../../firebase/firebase";

import GoogleIcon from "@mui/icons-material/Google";

// * isLogin is a boolean value to check if the user is login or signup
const GoogleAuth = ({ isLogin = false }) => {
  //* sign in with google
  const handleGoogleSignUp = async () => {
    try {
      // * sign in with google
      const response = await signInWithPopup(auth, googleProvider);
      // * create a new user or update in firestore
      if (!isLogin) {
        await setDoc(doc(db, "users", response.user.uid), {
          displayName: response.user.displayName,
          email: response.user.email,
          photoUrl: response.user.photoURL,
          createAt: serverTimestamp(),
        });
      }
    } catch (error) {
      // * handling error
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
