import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { useColors } from "../../theme/Theme";

import MenuIcon from "@mui/icons-material/Menu";
import UserProfile from "./UserProfile";
import Search from "./Search";
import FriendsList from "./FriendsList";

const SideBar = () => {
  const colors = useColors();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ProSidebar
      defaultCollapsed={collapsed}
      rootStyles={{
        "& .ps-sidebar-container": {
          backgroundColor: colors.secondary[700],
        },
        "& .ps-sidebar-container button:hover": {
          color: colors.primary[500],
        },
      }}
    >
      <Menu iconShape="square">
        {/* logo and menu icon */}
        <Box
          p="3%"
          display="flex"
          justifyContent={collapsed ? "space-around" : "space-between"}
          textAlign="center"
        >
          {!collapsed && <Typography variant="h3">Free Voice</Typography>}
          <IconButton onClick={() => setCollapsed((collapsed) => !collapsed)}>
            <MenuIcon />
          </IconButton>
        </Box>
        {/* user profile */}
        <UserProfile />

        {/* search */}
        <Typography variant="h6" pl="3%">
          Find Friends
        </Typography>
        <Search />

        {/* friends list */}
        <Typography variant="h6" pl="3%">
          Friends
        </Typography>
        <FriendsList />
      </Menu>
    </ProSidebar>
  );
};

export default SideBar;
