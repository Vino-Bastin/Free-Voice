import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthNavigator = ({ isLogin = false }) => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt="2%">
      <Typography variant="h6" display="flex">
        {isLogin ? "Already have an account?" : "Don't have a Account?"}
        <Link
          sx={{ cursor: "pointer", marginLeft: "4px" }}
          onClick={() => navigate(isLogin ? "/login" : "/signup")}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthNavigator;
