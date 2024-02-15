import { baseApi } from "../../API/baseApi";
import { Sale } from "./salesType";

export const salesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchSales: builder.query({
			query: () => ({
				url: "/sales",
				method: "GET",
			}),
			providesTags: ["sales"],

		}),
		addSale: builder.mutation({
			query: (salesData: Sale) => ({
				url: "/sales",
				method: "POST",
				body: salesData,
			}),
			invalidatesTags: ["sales"],
		}),
		deleteSale: builder.mutation<void, string>({
			query: (saleId) => ({
				url: `/${saleId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["sales"],

		}),
		fetchWeeklySales: builder.query({
			query: () => ({
				url: "/sales/weekly",
				method: "GET",
			}),
			providesTags: ["weekly-sales"],

		}),
		fetchMonthlySales: builder.query({
			query: () => ({
				url: "/sales/monthly",
				method: "GET",
			}),
			providesTags: ["monthly-sales"],

		}),
		fetchYearlySales: builder.query({
			query: () => ({
				url: "/sales/yearly",
				method: "GET",
			}),
			providesTags: ["yearly-sales"],

		}),
		fetchDailySales: builder.query({
			query: () => ({
				url: "/sales/daily",
				method: "GET",
			}),
			providesTags: ["daily-sales"],

		}),
	}),
});

export const {
	useFetchSalesQuery,
	useAddSaleMutation,
	useDeleteSaleMutation,
	useFetchWeeklySalesQuery,
	useFetchMonthlySalesQuery,
	useFetchYearlySalesQuery,
	useFetchDailySalesQuery,
} = salesApi;
