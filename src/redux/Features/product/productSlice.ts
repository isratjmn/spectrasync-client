/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productTypes";

interface ProductState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		fetchProductsStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
			state.loading = false;
			state.products = action.payload;
		},
		fetchProductsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		addProduct: (state, action: PayloadAction<Product>) => {
			state.loading = true;
			state.error = null;
			state.products.push(action.payload);
		},
		addProductSuccess: (state) => {
			state.loading = false;
		},
		addProductFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		addProductToDatabaseStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		addProductToDatabaseSuccess: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.products.push(action.payload); 
		},
		addProductToDatabaseFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		deleteProduct: (state, action: PayloadAction<string>) => {
			const productIdToDelete = action.payload;
			console.log(productIdToDelete);
			state.products = state.products.filter(
				(product) => product?.id !== productIdToDelete
			);
		},
	},
});

export const {
	fetchProductsStart,
	fetchProductsSuccess,
	fetchProductsFailure,
	addProduct,
	addProductSuccess,
	addProductFailure,
	deleteProduct,
} = productSlice.actions;

// Thunk action creator for adding a product
export const addProductToDatabase =
	(productData: Product) => async (dispatch: any) => {
		try {
			// Simulate API call or send data to the database
			await new Promise((resolve) => setTimeout(resolve, 1000));
			dispatch(addProduct(productData));
			dispatch(addProductSuccess());
		} catch (error: any) {
			dispatch(addProductFailure(error.message));
		}
	};

export default productSlice.reducer;
