import React, { useContext, useRef, useState } from "react";
import { TextField, Box, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  getDocs,
  query,
  collection,
  orderBy,
  startAt,
  endAt,
  serverTimestamp,
  setDoc,
  doc,
  where,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";
import { AuthContext } from "../../../firebase/AuthProvider";
import { setCurrentConversation } from "../../../store/Conversations";
import Profile from "./Profile";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Search = () => {
  const searchInputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  // * search for users by name
  const handleSearch = async () => {
    const name = searchInputRef.current.value;
    try {
      // * get all users whose name starts with the search input
      const docSnap = await getDocs(
        query(
          collection(db, "users"),
          orderBy("displayName"),
          startAt(name),
          endAt(name + "\uf8ff")
        )
      );
      // * clear the search input
      searchInputRef.current.value = "";
      // * set the users state to the users found
      setUsers(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
  };

  // * create a new conversation with the user clicked
  const handleNewFriend = async (userId, _) => {
    try {
      // * check if a conversation already exists between the two users
      let docSnap = await getDocs(
        query(
          collection(db, "conversations"),
          where("members", "in", [[auth.user.uid, userId]])
        )
      );
      if (docSnap.empty) {
        docSnap = await getDocs(
          query(
            collection(db, "conversations"),
            where("members", "in", [[userId, auth.user.uid]])
          )
        );
      }
      // * if no conversation exists, create a new one
      if (docSnap.empty) {
        await setDoc(
          doc(db, "conversations", [auth.user.uid, userId].join("-")),
          {
            members: [auth.user.uid, userId],
            createdAt: serverTimestamp(),
          }
        );
      } else {
        // * if a conversation exists, set it as the current conversation
        dispatch(setCurrentConversation(docSnap.docs[0].id));
      }
    } catch (error) {
      console.error(error);
    }
    setUsers([]);
  };

  return (
    <>
      <Typography variant="h6" pl="3%">
        Find Friends
      </Typography>
      <Box display="flex" p="3%">
        <TextField fullWidth variant="standard" inputRef={searchInputRef} />
        <IconButton onClick={handleSearch}>
          <PersonSearchIcon />
        </IconButton>
      </Box>
      {users.map((user) => (
        <Profile
          key={user.id}
          displayName={user.displayName}
          photoUrl={user.photoUrl}
          status={user.status || "Hey there! I am using ChatApp."}
          onClick={handleNewFriend}
          userId={user.id}
        />
      ))}
    </>
  );
};

export default Search;
