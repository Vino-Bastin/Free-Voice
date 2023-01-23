import React, { useContext, useRef } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import { db } from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthProvider";
import { selectCurrentConversation } from "../../store/Conversations";
import { useColors } from "../../theme/Theme";

import SendIcon from "@mui/icons-material/Send";

const NewMessage = () => {
  const newMessageInputRef = useRef(null);
  const colors = useColors();
  const currentConversation = useSelector(selectCurrentConversation);
  const auth = useContext(AuthContext);

  const handleSend = async () => {
    try {
      await setDoc(
        doc(db, "messages", currentConversation),
        {
          messages: arrayUnion({
            message: newMessageInputRef.current.value,
            sender: auth.user.uid,
            createAt: new Date(),
          }),
        },
        {
          merge: true, // merge with existing data
        }
      );

      newMessageInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box position="absolute" bottom="2%" width="98%">
        <TextField
          variant="standard"
          fullWidth
          placeholder="Type a message"
          inputRef={newMessageInputRef}
        />
      </Box>
      <Box position="absolute" bottom="2%" right="1%">
        <IconButton
          onClick={handleSend}
          sx={{
            "&:hover": {
              backgroundColor: colors.primary[500],
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default NewMessage;
