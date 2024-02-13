
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	salesHistory: [],
	loading: false,
	error: null,
};
const salesHistorySlice = createSlice({
	name: "salesHistory",
	initialState,
	reducers: {
		fetchSalesHistoryStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchSalesHistorySuccess: (state, action) => {
			state.loading = false;
			state.salesHistory = action.payload;
		},
		fetchSalesHistoryFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchSalesHistoryStart,
	fetchSalesHistorySuccess,
	fetchSalesHistoryFailure,
} = salesHistorySlice.actions;
export default salesHistorySlice.reducer;
