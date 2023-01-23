import React from "react";
import { Box, Typography } from "@mui/material";
import { useColors } from "../../theme/Theme";

const Message = ({ message, byMe = false, createAt }) => {
  const colors = useColors();

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent={byMe ? "flex-end" : "flex-start"}
    >
      <Box
        bgcolor={colors.primary[500]}
        p="1%"
        borderRadius={byMe ? "15px 0 15px 15px" : "0 10px 10px 10px"}
        m="0 1% 1% 0"
        maxWidth="60%"
      >
        <Typography fontSize="0.6rem" variant="subtitle2">
          {new Date(createAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h12",
          })}
        </Typography>
        <Typography
          fontSize="1.1rem"
          variant="body1"
          sx={{
            overflowWrap: "break-word",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
