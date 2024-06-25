/* eslint-disable @typescript-eslint/no-explicit-any */

import BarChartComponent from "../../components/chart/BarChartComponent";
import PieChartComponent from "../../components/chart/PieChartComponent";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";
import { useGetAllSalesQuery } from "../../redux/features/sales/salesApi";
import { useAppSelector } from "../../redux/hooks";

const DashboardHome = () => {
	const user = useAppSelector(selectCurrentUser);
	const userInfo = {
		email: user?.email,
		role: user?.role,
	};
	const { data: eyeGlasses } = useGetAllEyeGlassQuery(userInfo);
	const { data: sales } = useGetAllSalesQuery({
		userInfo,
	});
	const totalSales = sales?.data?.reduce((acc: any, item: any) => {
		return acc + item?.quantity * (item?.productId?.productPrice | 0);
	}, 0);
	const formattedTotalSales = totalSales?.toFixed(2);

	return (
		<div className="w-full mx-auto">
			<div className="flex overflow-hidden bg-white mx-auto">
				<div
					className="bg-gray-900 opacity-50 mx-10 hidden fixed inset-0 z-10"
					id="sidebarBackdrop"
				/>
				<div
					id="main-content"
					className="h-full w-full bg-gray-50 relative overflow-y-auto"
				>
					<main>
						<div className="pt-6 px-3 lg:px-6">
							<div className="my-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
								<div className="bg-gradient-to-r from-orange-100 to-red-300 text-black shadow rounded-lg p-4 sm:p-2 xl:p-8 ">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<span className="text-2xl sm:text-3xl leading-none font-bold ">
												{sales?.data?.length}
											</span>
											<h3 className="text-base font-normal ">
												Total Sales
											</h3>
										</div>
										<div className="ml-5 w-0 flex items-center justify-end flex-1 text-lime-600 text-base font-bold">
											14.6%
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
								<div className="bg-gradient-to-r from-purple-200 to-yellow-100 text-black shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<span className="text-2xl sm:text-3xl leading-none font-bold ">
												${formattedTotalSales}
											</span>
											<h3 className="text-base font-normal ">
												Total Sales Amount
											</h3>
										</div>
										<div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
											32.9%
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
								<div className="bg-gradient-to-r from-cyan-300 to-green-100 text-black shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<span className="text-2xl sm:text-3xl leading-none font-bold ">
												{eyeGlasses?.data?.length}
											</span>

											<h3 className="text-base font-normal ">
												Total Products
											</h3>
										</div>
										<div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
											-2.7%
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full grid mx-auto grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6  h-full">
									<div className="flex items-center mx-auto justify-between">
										<h3 className="text-xl leading-none text-deep-purple-900 font-bold mb-8">
											Brands & Total Products Quantity
										</h3>
									</div>
									<div className="mx-auto">
										<PieChartComponent />
									</div>
								</div>
								<div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
									<div className="mb-4 flex items-center justify-between">
										<h3 className="text-xl mb-2 text-deep-purple-900 font-bold">
											Brands Total Products Sales
										</h3>
									</div>
									<BarChartComponent />
								</div>
							</div>
						</div>
					</main>

					<p className="text-center text-sm text-gray-500 my-10">
						© 2024{" "}
						<a href="#" className="hover:underline" target="_blank">
							SpectraSync EyeGlasses
						</a>
						. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
