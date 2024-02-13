import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Store/store";

type TAuthState = {
	user: null | object;
	token: null | string;
	isAuthenticated: boolean;
};

const initialState: TAuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		registerUser: (state, action) => {
			state.user = action.payload;
			state.token = action.payload;
		},
		setUser: (state, action) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { registerUser, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
