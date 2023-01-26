import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { useColors } from "../../../theme/Theme";
import { selectSidebar } from "../../../store/SideBar";
import { selectCurrentConversation } from "../../../store/Conversations";

const Profile = ({
  onClick,
  displayName,
  photoUrl,
  status,
  conversationId = "",
  userId = "",
}) => {
  const colors = useColors();
  const collapsed = useSelector(selectSidebar);
  const currentConversation = useSelector(selectCurrentConversation);

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent={collapsed ? "center" : ""}
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
      onClick={() => {
        if (onClick) onClick(userId, conversationId);
      }}
    >
      {/* user profile photo */}
      <Avatar
        src={photoUrl}
        alt={displayName[0].toUpperCase() || "?"}
        sx={{
          width: "40px",
          height: "40px",
        }}
      />
      {/* user profile info */}
      {!collapsed && (
        <Box p="0% 3%" overflow="hidden">
          <Typography variant="h6">{displayName}</Typography>
          <Typography variant="subtitle2">{status}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
