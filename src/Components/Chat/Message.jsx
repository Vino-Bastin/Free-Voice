import React from "react";
import { formatDistanceToNow } from "date-fns";
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
        borderRadius="10px"
        mb="1%"
        maxWidth="60%"
      >
        <Typography fontSize="1.1rem" variant="body1">
          {message}
        </Typography>
        <Typography fontSize="0.6rem" variant="subtitle2">
          {formatDistanceToNow(new Date(createAt))}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
