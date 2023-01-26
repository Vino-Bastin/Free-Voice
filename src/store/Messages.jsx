import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {},
};

// ********** Slice **********
// * messages slice
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // * set messages
    setMessages(state, action) {
      state.messages = {
        ...state.messages,
        [action.payload.id]: {
          isRead: action.payload.isRead,
          lastMessageBy: action.payload.lastMessageBy,
          ...action.payload.data,
        },
      };
    },
    // * reset messages
    resetMessage(state) {
      state.messages = {};
    },
  },
});

// ********** Actions & reducers **********
// * messages actions
export const { setMessages, resetMessage } = messagesSlice.actions;
// * messages reducer
export default messagesSlice.reducer;

// ********** Selectors **********
// * select all messages by conversation id
export const selectMessagesByConversationId = createSelector(
  (state) => state.messages.messages,
  (_, conversationId) => conversationId,
  (messages, conversationId) => messages[conversationId]
);
