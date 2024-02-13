import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../Features/auth/authSlice";
import productReducer from "./../Features/product/productSlice";
import salesReducer from "./../Features/sales/salesSlice";

import { baseApi } from "./../API/baseApi";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "auth",
	storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		// [salesApi.reducerPath]: salesApi.reducer,
		auth: persistedReducer,
		product: productReducer,
		sales: salesReducer,
		// salesHistory: salesHistoryReducer,
	},
	middleware: (getDefaultStateMiddleware) =>
		getDefaultStateMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
