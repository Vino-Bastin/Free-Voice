import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {},
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = {
        ...state.messages,
        [action.payload.id]: {
          ...action.payload.data,
        },
      };
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

export const selectMessagesByConversationId = createSelector(
  (state) => state.messages.messages,
  (_, conversationId) => conversationId,
  (messages, conversationId) => messages[conversationId]
);
