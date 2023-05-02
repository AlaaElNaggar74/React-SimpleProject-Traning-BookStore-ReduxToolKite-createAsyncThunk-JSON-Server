import { createSlice } from "@reduxjs/toolkit";

export let authSlice = createSlice({
  name: "auth",
  initialState: { name: "ALAA", isLogin: false },
  reducers: {
    checkLogin: (state, action) => {
      state.isLogin = !state.isLogin;
    },
  },
});
export let { checkLogin } = authSlice.actions;
export default authSlice.reducer;
