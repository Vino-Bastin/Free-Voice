import { createContext, useEffect, useState } from "react";

import { auth } from "./firebase";

export const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ ...user });
      } else {
        setUser(null);
      }
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
