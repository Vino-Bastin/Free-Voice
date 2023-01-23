import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useColors } from "../../theme/Theme";
import {
  getDocs,
  collection,
  where,
  setDoc,
  serverTimestamp,
  query,
  doc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "../../store/Conversations";
import { auth, db } from "../../firebase/firebase";

const FriendProfile = ({
  displayName,
  status,
  setUsers,
  userId,
  isFriend = true,
  conversationId = "",
}) => {
  const colors = useColors();
  const dispatch = useDispatch();
  const currentConversation = useSelector(selectCurrentConversation);

  const handleNewFriend = async () => {
    if (isFriend && conversationId) {
      dispatch(setCurrentConversation({ id: conversationId }));
      return;
    }
    try {
      let docSnap = await getDocs(
        query(
          collection(db, "conversations"),
          where("members", "in", [[auth.currentUser.uid, userId]])
        )
      );

      if (docSnap.empty) {
        docSnap = await getDocs(
          query(
            collection(db, "conversations"),
            where("members", "in", [[userId, auth.currentUser.uid]])
          )
        );
      }

      if (docSnap.empty) {
        await setDoc(
          doc(db, "conversations", [auth.currentUser.uid, userId].join("-")),
          {
            members: [auth.currentUser.uid, userId],
            createdAt: serverTimestamp(),
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
    setUsers([]);
  };

  return (
    <Box
      display="flex"
      p="2% 1%"
      backgroundColor={
        currentConversation && currentConversation === conversationId
          ? colors.secondary[500]
          : ""
      }
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: colors.secondary[500],
        },
      }}
      onClick={handleNewFriend}
    >
      <Box
        width="40px"
        height="40px"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {displayName[0]}
      </Box>
      <Box p="0% 3%" overflow="hidden">
        <Typography variant="h6">{displayName}</Typography>
        <Typography variant="subtitle2">{status}</Typography>
      </Box>
    </Box>
  );
};

export default FriendProfile;
