import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";

import { useColors } from "../../../theme/Theme";
import { selectSidebar, toggleSidebar } from "../../../store/SideBar";

import UserProfile from "./UserProfile";
import Search from "./Search";
import FriendsList from "./FriendsList";

import MenuIcon from "@mui/icons-material/Menu";

const SideBar = () => {
  const colors = useColors();
  const collapsed = useSelector(selectSidebar);
  const dispatch = useDispatch();

  return (
    // * sidebar
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
      {/* sidebar menu's  */}
      <Menu iconShape="square">
        {/* logo and hamburger icon */}
        <Box
          p="3%"
          display="flex"
          justifyContent={collapsed ? "space-around" : "space-between"}
          textAlign="center"
        >
          {!collapsed && <Typography variant="h3">Free Voice</Typography>}
          <IconButton onClick={() => dispatch(toggleSidebar())}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* user profile */}
        {!collapsed && <UserProfile />}

        {/* search */}
        {!collapsed && <Search />}

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
