import { baseApi } from "../../API/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (userInfo) => ({
				url: "/auth/login",
				method: "POST",
				body: userInfo,
			}),
		}),
		register: builder.mutation({
			query: (registerData) => ({
				url: "/auth/register",
				method: "POST",
				body: registerData,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
