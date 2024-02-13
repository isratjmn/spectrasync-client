/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";
export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addEyeGlasses: builder.mutation({
			query: (eyeglasses) => ({
				url: "/eye-glasses",
				method: "POST",
				body: eyeglasses,
			}),
			invalidatesTags: ["all-eyeGlasses"],
		}),
		getEyeGlasses: builder.query({
			query: () => ({
				url: "/eye-glasses",
				method: "GET",
			}),
			providesTags: ["all-eyeGlasses"],
		}),
		updateEyeGlass: builder.mutation({
			query: (eyeglassData) => ({
				url: `eye-glasses/${eyeglassData._id}`,
				method: "PUT",
				body: eyeglassData,
			}),
			invalidatesTags: ["all-eyeGlasses"],
		}),
		deleteEyeGlasses: builder.mutation({
			query: (id) => ({
				url: `/eye-glasses/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["all-eyeGlasses"], 
		}),
		bulkDeleteEyeGlasses: builder.mutation({
			query: (eyeglassId) => ({
				url: "/eye-glasses",
				method: "DELETE",
				body: eyeglassId,
			}),
			invalidatesTags: ["all-eyeGlasses"],
		}),
	}),
});

export const {
	useAddEyeGlassesMutation,
	useGetEyeGlassesQuery,
	useUpdateEyeGlassMutation,
	useDeleteEyeGlassesMutation,
	useBulkDeleteEyeGlassesMutation,
} = productApi;
