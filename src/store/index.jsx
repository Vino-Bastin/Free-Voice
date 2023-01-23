import { configureStore } from "@reduxjs/toolkit";

import conversationsReducer from "./Conversations";
import messagesReducer from "./Messages";

const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    messages: messagesReducer,
  },
});

export default store;
