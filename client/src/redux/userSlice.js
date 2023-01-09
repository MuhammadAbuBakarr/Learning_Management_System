import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loginUser: {},
};

export const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		savelogin: (state, { payload }) => {
			state.loginUser = payload;
		},
		logout: (state, { payload }) => {
			state.loginUser = {};
		},
	},
});
export const myUser = (s) => s.loginReducer.loginUser;

export const { savelogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
