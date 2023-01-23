import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Chat from "../Components/Chat";
import { AuthContext } from "../firebase/AuthProvider";

const Main = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth.user) navigate("/login");

  if (auth.user === "initial") return <></>;

  return <Chat />;
};

export default Main;
