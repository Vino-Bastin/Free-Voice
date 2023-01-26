import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

import {
  selectCurrentConversation,
  selectCurrentConversationUser,
} from "../../store/Conversations";

import { useColors } from "../../theme/Theme";
import Messages from "./Messages";
import NewMessage from "./Messages/NewMessage";

const Chats = () => {
  const colors = useColors();
  const currentConversation = useSelector(selectCurrentConversation);
  const currentConversationUser = useSelector(selectCurrentConversationUser);

  if (!currentConversation) return <></>;

  return (
    <Box width="100%" p="1%" position="relative">
      {/* chat header */}
      <Box display="flex" bgcolor={colors.primary[500]} p="1%" mb="1%">
        <Avatar
          sx={{
            width: 50,
            height: 50,
            marginRight: "10px",
          }}
          src={currentConversationUser.photoUrl}
          alt={currentConversationUser.displayName[0].toUpperCase()}
        />
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
