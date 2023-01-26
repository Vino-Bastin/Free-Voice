import { createSelector, createSlice } from "@reduxjs/toolkit";

// ********** Slice **********
// * sidebar slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: false,
  reducers: {
    // * toggle sidebar
    toggleSidebar: (state) => !state,
  },
});

// ********** Actions & reducers **********
// * sidebar actions
export const { toggleSidebar } = sidebarSlice.actions;
// * sidebar reducer
export default sidebarSlice.reducer;

// ********** Selectors **********
// * select sidebar
export const selectSidebar = createSelector(
  (state) => state.sidebar,
  (sidebar) => sidebar
);
