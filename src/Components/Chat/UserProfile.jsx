import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext, useColors } from "../../theme/Theme";
import { AuthContext } from "../../firebase/AuthProvider";
import { signOut } from "firebase/auth";

import { auth as firebaseAuth } from "../../firebase/firebase";

import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const UserProfile = () => {
  const colors = useColors();
  const auth = useContext(AuthContext);
  const { toggleMode, mode } = useContext(ThemeContext);

  if (!auth.user) return <></>;

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="3%"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "4.5rem",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: colors.primary[500],
        }}
      >
        {auth.user.displayName ? auth.user.displayName[0] : "?"}
      </Box>
      <Typography mt="5px" variant="h5">
        {auth.user.displayName}
      </Typography>
      <Box mt="10px">
        {mode === "dark" ? (
          <Tooltip arrow title="Light Mode">
            <IconButton onClick={toggleMode}>
              <LightModeIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip arrow title="Dark Mode">
            <IconButton onClick={toggleMode}>
              <DarkModeIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip arrow title="Logout">
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default UserProfile;
