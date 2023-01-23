import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

import { AuthContext } from "../../firebase/AuthProvider";
import { selectCurrentConversation } from "../../store/Conversations";
import { selectMessagesByConversationId } from "../../store/Messages";
import Message from "./Message";

const formatDate = (date) => {
  const newDate = new Date(date);
  if (new Date().toLocaleDateString() === newDate.toLocaleDateString()) {
    return "Today";
  }
  return newDate.toLocaleDateString();
};

const Messages = () => {
  let date = null;

  const lastMessageRef = React.useRef(null);

  const auth = useContext(AuthContext);
  const currentConversation = useSelector(selectCurrentConversation);
  const messages = useSelector((state) =>
    selectMessagesByConversationId(state, currentConversation)
  );

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [messages]);

  const getDivider = (createAt) => {
    if (date === null) {
      date = formatDate(createAt);
      return (
        <Box>
          <Divider variant="fullWidth" sx={{ marginBottom: "10px" }}>
            {formatDate(createAt)}
          </Divider>
        </Box>
      );
    }

    if (formatDate(createAt) !== date) {
      date = formatDate(createAt);
      return (
        <Box>
          <Divider variant="fullWidth" sx={{ marginBottom: "10px" }}>
            {formatDate(createAt)}
          </Divider>
        </Box>
      );
    }

    return <></>;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mb="10%"
      overflow="auto"
      height="80%"
      width="100%"
    >
      {messages &&
        Object.entries(messages).map(([key, message]) => (
          <Box key={key}>
            {getDivider(message.createAt)}
            <Message
              message={message.message}
              byMe={message.sender === auth.user.uid}
              createAt={message.createAt}
            />
          </Box>
        ))}

      <div ref={lastMessageRef} />
    </Box>
  );
};

export default Messages;
