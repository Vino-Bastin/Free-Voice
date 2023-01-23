import React, { useCallback, useContext, useEffect } from "react";
import {
  onSnapshot,
  collection,
  where,
  query,
  getDoc,
  doc,
  documentId,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

import {
  selectConversations,
  setConversation,
} from "../../store/Conversations";
import { setMessages } from "../../store/Messages";

import { db } from "../../firebase/firebase";
import { AuthContext } from "../../firebase/AuthProvider";
import FriendProfile from "./FriendProfile";

const FriendsList = () => {
  const auth = useContext(AuthContext);
  const conversations = useSelector(selectConversations);
  const dispatch = useDispatch();

  const getFriendId = useCallback(
    (members) => {
      if (!auth.user) return members[0];
      if (members[0] === auth.user.uid) return members[1];
      return members[0];
    },
    [auth]
  );

  useEffect(() => {
    const conversationsArray = Object.keys(conversations);
    if (!conversationsArray.length) return;

    const unSubtribe = onSnapshot(
      query(
        collection(db, "messages"),
        where(documentId(), "in", conversationsArray)
      ),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          dispatch(
            setMessages({
              id: change.doc.id,
              data: change.doc.data().messages.map((message) => ({
                ...message,
                createAt: `${message.createAt.toDate()}`,
              })),
            })
          );
          console.log("New message: ", change.doc.data());
        });
      }
    );

    return () => {
      unSubtribe();
    };
  }, [auth, dispatch, conversations]);

  //* Get conversations
  useEffect(() => {
    if (!auth.user) return;
    const unSubtribe = onSnapshot(
      query(
        collection(db, "conversations"),
        where("members", "array-contains", auth.user.uid)
      ),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const friendId = getFriendId(change.doc.data().members);
          getDoc(doc(db, "users", friendId))
            .then((friendDetails) => {
              dispatch(
                setConversation({
                  id: change.doc.id,
                  data: {
                    ...change.doc.data(),
                    createdAt: `${change.doc.data().createdAt.toDate()}`,
                  },
                  profile: friendDetails.data(),
                })
              );
              console.log("New conversation: ", change.doc.data());
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        });
      }
    );

    return () => {
      unSubtribe();
    };
  }, [auth, dispatch]);

  return (
    <>
      {Object.entries(conversations).map(([key, value]) => (
        <FriendProfile
          key={key}
          conversationId={key}
          displayName={value.profile.displayName}
          status={value.profile.status || "Hey there"}
          userId={value.profile.uid}
        />
      ))}
    </>
  );
};

export default FriendsList;
