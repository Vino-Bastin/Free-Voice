import { configureStore } from "@reduxjs/toolkit";

import conversationsReducer from "./Conversations";
import messagesReducer from "./Messages";
import loadingReducer from "./Loading";
import sideBarReducer from "./SideBar";

// ********** Store **********
// * store
const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    messages: messagesReducer,
    loading: loadingReducer,
    sidebar: sideBarReducer,
  },
});

export default store;
