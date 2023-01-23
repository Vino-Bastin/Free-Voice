import React from "react";
import { Box } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";

import Chats from "./Chats";
import SideBar from "./SideBar";

const Chat = () => {
  return (
    <ProSidebarProvider>
      <Box display="flex" height="100%">
        <SideBar />
        <Chats />
      </Box>
    </ProSidebarProvider>
  );
};

export default Chat;
