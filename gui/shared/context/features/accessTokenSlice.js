import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    unset: (state) => {
      state.value = "";
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { unset, set } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
