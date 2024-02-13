
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sales: [],
	loading: false,
	error: null,
};

const salesSlice = createSlice({
	name: "sales",
	initialState,
	reducers: {
		sellRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		sellSuccess: (state, action) => {
			state.loading = false;
			state.sales = action.payload;
		},
		sellError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { sellRequest, sellSuccess, sellError } = salesSlice.actions;
export default salesSlice.reducer;
