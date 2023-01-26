import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../../../firebase/firebase";
import { AuthContext } from "../../../firebase/AuthProvider";
import { selectCurrentConversation } from "../../../store/Conversations";
import { selectMessagesByConversationId } from "../../../store/Messages";
import Message from "./Message";

import DoneIcon from "@mui/icons-material/Done";

// * Format date
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

    // * update last message isRead
    if (
      messages &&
      messages.lastMessageBy !== auth.user.uid &&
      !messages.isRead
    ) {
      updateDoc(doc(db, "messages", currentConversation), {
        isRead: true,
      });
    }
  }, [messages, auth, currentConversation]);

  // * get divider if date is different for organize messages
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
      {/* messages */}
      {messages &&
        Object.entries(messages).map(([key, message]) => {
          if (["isRead", "lastMessageBy"].includes(key))
            return <div key={key}></div>;
          return (
            <Box key={key}>
              {getDivider(message.createAt)}
              <Message
                message={message.message}
                byMe={message.sender === auth.user.uid}
                createAt={message.createAt}
                isRead={message.isRead}
              />
            </Box>
          );
        })}
      {/* message read tick */}
      {messages && messages.lastMessageBy === auth.user.uid && (
        <Box color={messages.isRead ? "success.main" : ""} textAlign="right">
          <DoneIcon />
        </Box>
      )}
      <div ref={lastMessageRef} />
    </Box>
  );
};

export default Messages;
