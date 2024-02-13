/* eslint-disable @typescript-eslint/no-explicit-any */
// Action Type
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

// Action Creator
export const fetchProductsSuccess = (eyeglassesData: any) => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: eyeglassesData,
});

export const fetchProducts = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
		try {
			const response = await fetch(
				"https://spectrasync-server.vercel.app/api/eye-glasses"
			);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			dispatch(fetchProductsSuccess(data));
		} catch (error: any) {
			console.error("Error fetching products:", error.message);
			
		}
	};
};
