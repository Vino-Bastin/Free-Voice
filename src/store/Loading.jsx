import { createSlice, createSelector } from "@reduxjs/toolkit";

// ********** Slice **********
// * loading slice
const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    // * set loading
    setLoading: (_, action) => action.payload,
  },
});

// ********** Actions & reducers **********
// * loading actions
export const { setLoading } = loadingSlice.actions;
// * loading reducer
export default loadingSlice.reducer;

// ********** Selectors **********
// * select loading
export const selectLoading = createSelector(
  (state) => state.loading,
  (loading) => loading
);
