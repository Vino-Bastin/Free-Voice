import React, { useContext, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth as firebaseAuth, db } from "../../../firebase/firebase";
import {
  changeProfilePhoto,
  uploadProfilePhoto,
} from "../../../firebase/firestore";
import { AuthContext } from "../../../firebase/AuthProvider";
import { ThemeContext, useColors } from "../../../theme/Theme";
import { resetConversation } from "../../../store/Conversations";
import { resetMessage } from "../../../store/Messages";

import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import EditIcon from "@mui/icons-material/Edit";

const UserProfile = () => {
  const newProfilePricker = useRef(null);
  const colors = useColors();
  const auth = useContext(AuthContext);
  const { toggleMode, mode } = useContext(ThemeContext);
  const dispatch = useDispatch();

  if (!auth.user) return <></>;

  // * handle logout
  const handleLogout = async () => {
    try {
      // * update user status in firebase firestore
      await updateDoc(doc(db, "users", auth.user.uid), {
        status: "offline",
      });
      // * sign-out user from firebase auth
      await signOut(firebaseAuth);
    } catch (error) {
      console.error(error);
    } finally {
      // * resetting conversation and message state in redux
      dispatch(resetConversation());
      dispatch(resetMessage());
      // * resetting user in context
      auth.setUser({ user: null });
    }
  };

  // * handle profile photo change
  const changeProfile = async (e) => {
    try {
      let downloadUrl = "";
      if (
        auth.user.photoUrl &&
        auth.user.photoUrl.includes("chat-12033.appspot.com")
      ) {
        // * delete existing photo and upload new photo
        downloadUrl = await changeProfilePhoto(
          auth.user.uid,
          auth.user.photoUrl,
          e.target.files[0]
        );
      } else {
        // * uploading new profile photo to firebase storage
        downloadUrl = await uploadProfilePhoto(
          auth.user.uid,
          e.target.files[0]
        );
      }
      // * updating user profile photo in firebase auth
      await updateDoc(doc(db, "users", auth.user.uid), {
        photoUrl: downloadUrl,
      });

      // * updating user profile photo in context
      auth.setUser((user) => ({ ...user, photoUrl: downloadUrl }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="3%"
    >
      {/* user profile photo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "4.5rem",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: colors.primary[500],
          position: "relative",
        }}
      >
        {/* user profile edit icon */}
        <Tooltip arrow title="Edit Profile">
          <IconButton
            sx={{
              position: "absolute",
              bottom: "-10px",
              right: "0",
            }}
            onClick={() => newProfilePricker.current.click()}
          >
            <EditIcon />
            <input
              type="file"
              hidden
              onChange={changeProfile}
              ref={newProfilePricker}
              accept="image/jpeg, image/png, image/jpg"
            />
          </IconButton>
        </Tooltip>

        {/* user Profile  */}
        <Avatar
          src={auth.user.photoUrl}
          alt={auth.user.displayName[0].toUpperCase() || "?"}
          sx={{
            width: "100px",
            height: "100px",
          }}
        />
      </Box>

      {/* user full name */}
      <Typography mt="5px" variant="h5">
        {auth.user.displayName}
      </Typography>

      <Box mt="10px">
        {/* theme change buttons */}
        {mode === "dark" ? (
          <Tooltip arrow title="Light Mode">
            <IconButton onClick={toggleMode}>
              <LightModeIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip arrow title="Dark Mode">
            <IconButton onClick={toggleMode}>
              <DarkModeIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* logout button */}
        <Tooltip arrow title="Logout">
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default UserProfile;
