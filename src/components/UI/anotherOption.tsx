{
	/* <Tabs activeKey={activeTab} onChange={handleTabChange}>
			<TabPane tab="Weekly" key="weekly">
				{Array.isArray(weeklySalesData) && (
					<Table columns={columns} dataSource={weeklyData?.data} />
				)}
			</TabPane>
			<TabPane tab="Daily" key="daily">
				{Array.isArray(dailySalesData) && (
					<Table columns={columns} dataSource={dailyData?.data} />
				)}
			</TabPane>
			<TabPane tab="Monthly" key="monthly">
				{Array.isArray(monthlySalesData) && (
					<Table columns={columns} dataSource={monthlyData?.data} />
				)}
			</TabPane>
			<TabPane tab="Yearly" key="yearly">
				{Array.isArray(yearlySalesData) && (
					<Table columns={columns} dataSource={yearlyData?.data} />
				)}
			</TabPane>
		</Tabs> */
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* import { SetStateAction, useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import {
	useFetchDailySalesQuery,
	useFetchMonthlySalesQuery,
	useFetchWeeklySalesQuery,
	useFetchYearlySalesQuery,
} from "../../redux/Features/sales/salesApi";
const { TabPane } = Tabs;
const SalesHistory = () => {
	const [weeklySalesData, setWeeklySalesData] = useState<any[]>([]);
	const [dailySalesData, setDailySalesData] = useState<any[]>([]);
	const [monthlySalesData, setMonthlySalesData] = useState<any[]>([]);
	const [yearlySalesData, setYearlySalesData] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState("weekly");

	const { data: weeklyData, error: weeklyError } =
		useFetchWeeklySalesQuery("");
	const { data: dailyData, error: dailyError } = useFetchDailySalesQuery("");
	const { data: monthlyData, error: monthlyError } =
		useFetchMonthlySalesQuery("");
	const { data: yearlyData, error: yearlyError } =
		useFetchYearlySalesQuery("");
	useEffect(() => {
		if (Array.isArray(weeklyData)) setWeeklySalesData(weeklyData);
		if (Array.isArray(dailyData)) setDailySalesData(dailyData);
		if (Array.isArray(monthlyData)) setMonthlySalesData(monthlyData);
		if (Array.isArray(yearlyData)) setYearlySalesData(yearlyData);
	}, [weeklyData, dailyData, monthlyData, yearlyData]);
	console.log(weeklyData?.data);
	console.log(dailyData?.data);
	console.log(monthlyData?.data);
	console.log(yearlyData?.data);
	const handleTabChange = (key: SetStateAction<string>) => {
		setActiveTab(key);
	};
	const columns = [
		{
			title: "Quantity Sold",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "Buyer Name",
			dataIndex: "buyerName",
			key: "buyerName",
		},
		{
			title: "Sale Date",
			dataIndex: "saleDate",
			key: "saleDate",
		},
	];
	return (
		<Tabs activeKey={activeTab} onChange={handleTabChange}>
			<TabPane tab="Weekly" key="weekly">
				{Array.isArray(weeklySalesData) && (
					<Table columns={columns} dataSource={weeklyData?.data} />
				)}
			</TabPane>
			<TabPane tab="Daily" key="daily">
				{Array.isArray(dailySalesData) && (
					<Table columns={columns} dataSource={dailyData?.data} />
				)}
			</TabPane>
			<TabPane tab="Monthly" key="monthly">
				{Array.isArray(monthlySalesData) && (
					<Table columns={columns} dataSource={monthlyData?.data} />
				)}
			</TabPane>
			<TabPane tab="Yearly" key="yearly">
				{Array.isArray(yearlySalesData) && (
					<Table columns={columns} dataSource={yearlyData?.data} />
				)}
			</TabPane>
		</Tabs>
	);
};

export default SalesHistory; */







/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	
	ShoppingCartOutlined,
	ShoppingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
// import { Bar } from "react-chartjs-2";
import { getCustomers, getInventory, getOrders } from "../../api";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function Dashboard() {
	const [orders, setOrders] = useState<number>(0);
	const [inventory, setInventory] = useState<number>(0);
	const [customers, setCustomers] = useState<number>(0);
	// const [revenue, setRevenue] = useState<number>(0);

	useEffect(() => {
		getOrders().then((res) => {
			setOrders(res.total);
			// setRevenue(res.discountedTotal);
		});
		getInventory().then((res) => {
			setInventory(res.total);
		});
		getCustomers().then((res) => {
			setCustomers(res.total);
		});
	}, []);

	return (
		<Space size={20} direction="vertical">
			<Typography.Title style={{ fontWeight: 700 }} level={4}>
				User Dashboard
			</Typography.Title>
			<Space direction="horizontal" wrap style={{ overflowX: "auto" }}>
				<DashboardCard
					icon={
						<ShoppingCartOutlined
							style={{
								color: "green",
								backgroundColor: "rgba(0,255,0,0.25)",
								borderRadius: 20,
								fontSize: 24,
								padding: 8,
							}}
						/>
					}
					title={"Orders"}
					value={orders}
				/>
				<DashboardCard
					icon={
						<ShoppingOutlined
							style={{
								color: "blue",
								backgroundColor: "rgba(0,0,255,0.25)",
								borderRadius: 20,
								fontSize: 24,
								padding: 8,
							}}
						/>
					}
					title={"Inventory"}
					value={inventory}
				/>
				<DashboardCard
					icon={
						<UserOutlined
							style={{
								color: "purple",
								backgroundColor: "rgba(0,255,255,0.25)",
								borderRadius: 20,
								fontSize: 24,
								padding: 8,
							}}
						/>
					}
					title={"Customer"}
					value={customers}
				/>
				{/* <DashboardCard
					icon={
						<DollarCircleOutlined
							style={{
								color: "red",
								backgroundColor: "rgba(255,0,0,0.25)",
								borderRadius: 20,
								fontSize: 24,
								padding: 8,
							}}
						/>
					}
					title={"Revenue"}
					// value={revenue}
				/> */}
			</Space>
			<Space direction="horizontal" wrap>
				<RecentOrders />
				{/* <DashboardChart /> */}
			</Space>
		</Space>
	);
}

interface DashboardCardProps {
	icon: JSX.Element;
	title: string;
	value: number;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
	return (
		<Card style={{ width: 350, flex: "1 1 300px", marginBottom: 20 }}>
			<Space direction="horizontal">
				{icon}
				<Statistic
					title={
						<Typography.Title
							level={4}
							style={{ fontSize: 20, fontWeight: 700 }}
						>
							{title}
						</Typography.Title>
					}
					value={value}
				/>
			</Space>
		</Card>
	);
}

function RecentOrders() {
	const [dataSource, setDataSource] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		getOrders().then((res) => {
			setDataSource(res.products.splice(0, 10));
			setLoading(false);
		});
	}, []);

	return (
		<>
			<Typography.Text>Recent Orders</Typography.Text>
			<Table
				columns={[
					{ title: "Title", dataIndex: "title" },
					{ title: "Quantity", dataIndex: "quantity" },
					{ title: "Price", dataIndex: "discountedPrice" },
				]}
				loading={loading}
				dataSource={dataSource}
				pagination={false}
				style={{ width: 700 }}
			/>
		</>
	);
}

/* function DashboardChart() {
	const [revenueData, setRevenueData] = useState<any>({
		labels: [],
		datasets: [],
	});
	useEffect(() => {
		getRevenue().then((res) => {
			const labels = res.carts.map(
				(cart: { userId: any }) => `User-${cart.userId}`
			);
			const data = res.carts.map(
				(cart: { discountedTotal: any }) => cart.discountedTotal
			);
			const chartData = {
				labels,
				datasets: [
					{
						label: "Revenue",
						data,
						backgroundColor: "rgba(255, 0, 0, 1)",
					},
				],
			};
			setRevenueData(chartData);
		});
	}, []);
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom" as const, 
			},
			title: { display: true, text: "Order Revenue" },
		},
	};
	return (
		<Card style={{ width: 715, height: 350, flex: "1 1 400px" }}>
			<Bar options={options} data={revenueData} />
		</Card>
	);
} */
export default Dashboard;
