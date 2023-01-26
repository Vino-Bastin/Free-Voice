import React, { useCallback, useContext, useEffect, useMemo } from "react";
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
  setCurrentConversation,
} from "../../../store/Conversations";
import { setMessages } from "../../../store/Messages";
import { AuthContext } from "../../../firebase/AuthProvider";
import { db } from "../../../firebase/firebase";

import Profile from "./Profile";

const sortConversations = (conversations) => {
  return Object.entries(conversations).sort((a, b) => {
    if (a[1].lastMessageTime === "undefined") return 1;
    if (b[1].lastMessageTime === "undefined") return -1;
    return new Date(b[1].lastMessageTime) - new Date(a[1].lastMessageTime);
  });
};

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

  // * Get messages
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
              isRead: change.doc.data().isRead,
              lastMessageBy: change.doc.data().lastMessageBy,
            })
          );
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
                    members: change.doc.data().members,
                    lastMessageTime: `${change.doc
                      .data()
                      .lastMessageTime?.toDate()}`,
                    lastMessage: change.doc.data().lastMessage,
                    createdAt: `${change.doc.data().createdAt.toDate()}`,
                  },
                  profile: {
                    ...friendDetails.data(),
                    createAt: `${friendDetails.data().createAt?.toDate()}`,
                  },
                })
              );
            })
            .catch((error) => {
              console.error("Error getting document:", error);
            });
        });
      }
    );

    return () => {
      unSubtribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, dispatch]);

  const conversationsList = useMemo(
    () => sortConversations(conversations),
    [conversations]
  );

  // * Set current conversation
  const onFriendClick = (_, conversationId) => {
    dispatch(setCurrentConversation({ id: conversationId }));
  };

  return (
    <>
      {conversationsList.map(([conversationId, conversation]) => (
        <Profile
          key={conversationId}
          displayName={conversation.profile.displayName}
          status={conversation.lastMessage || "Hey there"}
          photoUrl={conversation.profile.photoUrl}
          onClick={onFriendClick}
          conversationId={conversationId}
        />
      ))}
    </>
  );
};

export default FriendsList;
