import { createContext, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { doc as Doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "./firebase";

export const AuthContext = createContext({
  user: "initial",
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        // * get user data from firestore
        getDoc(Doc(db, "users", user.uid)).then((doc) => {
          if (doc.exists()) {
            // * update user status to online
            updateDoc(Doc(db, "users", user.uid), {
              status: "online",
            });
            setUser({ uid: user.uid, ...doc.data() });
            navigate("/");
          }
        });
      } else {
        setUser(null);
        navigate("/login");
      }
      setLoading(false);
    });

    return () => {
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <AuthContext.Provider value={{ user: user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
