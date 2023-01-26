import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  conversations: {},
  currentConversationUser: null,
  currentConversation: null,
};

// ********** Slice **********
// * conversation slice
const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    // * set conversation
    setConversation(state, action) {
      state.conversations = {
        ...state.conversations,
        [action.payload.id]: {
          ...action.payload.data,
          profile: action.payload.profile,
        },
      };
    },
    // * set current conversation
    setCurrentConversation(state, action) {
      state.currentConversation = action.payload.id;
      state.currentConversationUser =
        state.conversations[action.payload.id]?.profile;
    },
    // * reset conversation
    resetConversation(state) {
      state.conversations = {};
      state.currentConversation = null;
      state.currentConversationUser = null;
    },
  },
});

// ********** Actions & reducers **********
// * conversation actions
export const { setConversation, setCurrentConversation, resetConversation } =
  conversationsSlice.actions;
// * conversation reducer
export default conversationsSlice.reducer;

// ********** Selectors **********
// * select all conversations
export const selectConversations = createSelector(
  (state) => state.conversations.conversations,
  (conversations) => conversations
);

//* select current conversation
export const selectCurrentConversation = createSelector(
  (state) => state.conversations.currentConversation,
  (currentConversation) => currentConversation
);

// * select current conversation user details
export const selectCurrentConversationUser = createSelector(
  (state) => state.conversations.currentConversationUser,
  (currentConversationUser) => currentConversationUser
);
