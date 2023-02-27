import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => (state.value = action.payload),
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
