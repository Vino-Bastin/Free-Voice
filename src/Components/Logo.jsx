import React from "react";
import { Typography } from "@mui/material";
import { useColors } from "../theme/Theme";

const Logo = () => {
  const colors = useColors();

  return (
    <>
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
    </>
  );
};

export default Logo;
