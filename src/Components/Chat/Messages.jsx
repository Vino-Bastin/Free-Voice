import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import { AuthContext } from "../../firebase/AuthProvider";
import { selectCurrentConversation } from "../../store/Conversations";
import { selectMessagesByConversationId } from "../../store/Messages";
import Message from "./Message";

const Messages = () => {
  const auth = useContext(AuthContext);
  const currentConversation = useSelector(selectCurrentConversation);
  const messages = useSelector((state) =>
    selectMessagesByConversationId(state, currentConversation)
  );

  return (
    <Box display="flex" flexDirection="column" mb="10%" overflow="auto">
      {messages &&
        Object.entries(messages).map(([key, message]) => (
          <Message
            key={key}
            message={message.message}
            byMe={message.sender === auth.user.uid}
            createAt={message.createAt}
          />
        ))}
    </Box>
  );
};

export default Messages;
