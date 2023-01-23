import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

import { auth, db } from "./firebase";

export const AuthContext = createContext({ user: "initial" });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!user.displayName) {
          getDoc(doc(db, "users", user.uid)).then((doc) => {
            if (doc.exists()) {
              user.displayName = doc.data().displayName;
            }
            setUser({ ...user });
          });
        } else {
          setUser({ ...user });
        }
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
