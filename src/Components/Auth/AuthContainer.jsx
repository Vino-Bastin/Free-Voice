import React from "react";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useColors } from "../../theme/Theme";

const AuthContainer = ({ children }) => {
  const colors = useColors();
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    // * this is the container for the sign up and login page
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {/* signup container & login container*/}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={isMobile ? "100%" : "50%"}
        height={isMobile ? "100%" : "auto"}
        borderRadius="10px"
        p="2%"
        backgroundColor={colors.secondary[700]}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthContainer;
