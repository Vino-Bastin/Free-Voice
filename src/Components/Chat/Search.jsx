import React, { useRef, useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import {
  getDocs,
  query,
  collection,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FriendProfile from "./FriendProfile";

const Search = () => {
  const searchInputRef = useRef(null);
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const name = searchInputRef.current.value;
    try {
      const docSnap = await getDocs(
        query(
          collection(db, "users"),
          orderBy("displayName"),
          startAt(name),
          endAt(name + "\uf8ff")
        )
      );
      searchInputRef.current.value = "";
      setUsers(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box display="flex" p="3%">
        <TextField fullWidth variant="standard" inputRef={searchInputRef} />
        <IconButton onClick={handleSearch}>
          <PersonSearchIcon />
        </IconButton>
      </Box>
      {users.map((user) => (
        <FriendProfile
          key={user.id}
          userId={user.id}
          displayName={user.displayName}
          status={"none"}
          setUsers={setUsers}
          isFriend={false}
        />
      ))}
    </>
  );
};

export default Search;
