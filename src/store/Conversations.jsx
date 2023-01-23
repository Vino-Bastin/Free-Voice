import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  conversations: {},
  currentConversationUser: null,
  currentConversation: null,
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversation(state, action) {
      state.conversations = {
        ...state.conversations,
        [action.payload.id]: {
          ...action.payload.data,
          profile: action.payload.profile,
        },
      };
    },
    setCurrentConversation(state, action) {
      state.currentConversation = action.payload.id;
      state.currentConversationUser =
        state.conversations[action.payload.id]?.profile;
    },
  },
});

export const { setConversation, setCurrentConversation } =
  conversationsSlice.actions;
export default conversationsSlice.reducer;

export const selectConversations = createSelector(
  (state) => state.conversations.conversations,
  (conversations) => conversations
);

export const selectCurrentConversation = createSelector(
  (state) => state.conversations.currentConversation,
  (currentConversation) => currentConversation
);

export const selectCurrentConversationUser = createSelector(
  (state) => state.conversations.currentConversationUser,
  (currentConversationUser) => currentConversationUser
);
