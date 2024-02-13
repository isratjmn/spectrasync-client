import { baseApi } from "../../API/baseApi";
import { Sale } from "./salesType";

export const salesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchSales: builder.query({
			query: () => ({
				url: "/sales",
				method: "GET",
			}),
		}),
		addSale: builder.mutation({
			query: (salesData: Sale) => ({
				url: "/sales",
				method: "POST",
				body: salesData,
			}),
		}),
		deleteSale: builder.mutation<void, string>({
			query: (saleId) => ({
				url: `/${saleId}`,
				method: "DELETE",
			}),
		}),
		fetchWeeklySales: builder.query({
			query: () => ({
				url: "/sales/weekly",
				method: "GET",
			}),
		}),
		fetchMonthlySales: builder.query({
			query: () => ({
				url: "/sales/monthly",
				method: "GET",
			}),
		}),
		fetchYearlySales: builder.query({
			query: () => ({
				url: "/sales/yearly",
				method: "GET",
			}),
		}),
		fetchDailySales: builder.query({
			query: () => ({
				url: "/sales/daily",
				method: "GET",
			}),
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
