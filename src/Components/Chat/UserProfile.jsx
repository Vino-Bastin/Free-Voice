import React from "react";
import { Box, Typography } from "@mui/material";
import { useColors } from "../../theme/Theme";

const UserProfile = () => {
  const colors = useColors();
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
        V
      </Box>
      <Typography mt="5px" variant="h5">
        Vino
      </Typography>
    </Box>
  );
};

export default UserProfile;
