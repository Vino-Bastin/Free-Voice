import React from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import Chat from "../Components/Chat";

const Main = () => {
  const navigate = useNavigate();

  if (!auth.currentUser) navigate("/login");

  return <Chat />;
};

export default Main;
