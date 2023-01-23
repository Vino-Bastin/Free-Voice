import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import {
  selectCurrentConversation,
  selectCurrentConversationUser,
} from "../../store/Conversations";

import { useColors } from "../../theme/Theme";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

const Chats = () => {
  const colors = useColors();
  const currentConversation = useSelector(selectCurrentConversation);
  const currentConversationUser = useSelector(selectCurrentConversationUser);

  if (!currentConversation) return <></>;

  return (
    <Box width="calc(100% - 250px)" p="1%" position="relative">
      {/* chat header */}
      <Box display="flex" bgcolor={colors.primary[500]} p="1%" mb="1%">
        <Box
          bgcolor={colors.primary[700]}
          width="50px"
          height="50px"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="2rem"
          mr="2%"
        >
          {currentConversationUser.displayName[0].toUpperCase()}
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h6">
            {currentConversationUser.displayName}
          </Typography>
          <Typography variant="body2">
            {currentConversationUser.status || "Hey There"}
          </Typography>
        </Box>
      </Box>

      {/* chat messages */}
      <Messages />

      {/* new Message input */}
      <NewMessage />
    </Box>
  );
};

export default Chats;
