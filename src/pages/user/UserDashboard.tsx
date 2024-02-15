/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	ShoppingCartOutlined,
	ShoppingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Badge, Card, Space, Statistic, Table, Typography } from "antd";
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
import { getCustomers, getInventory, getOrders } from "../../api";
import { useFetchWeeklySalesQuery } from "../../redux/Features/sales/salesApi";
import moment from "moment";

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

	useEffect(() => {
		getOrders().then((res) => {
			setOrders(res.total);
		});
		getInventory().then((res) => {
			setInventory(res?.meta?.total);
		});
		getCustomers().then((res) => {
			setCustomers(res.total);
		});
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px",
			}}
		>
			<Typography.Title
				style={{
					fontWeight: 800,
					fontSize: "28px",
					marginBottom: "20px",
					textAlign: "center",
				}}
				level={4}
			>
				User Dashboard
			</Typography.Title>
			<Space
				direction="horizontal"
				wrap
				style={{ overflowX: "auto", justifyContent: "center" }}
			>
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
			</Space>
			<RecentOrders />
		</div>
	);
}

interface DashboardCardProps {
	icon: JSX.Element;
	title: string;
	value: number;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
	return (
		<Card style={{ width: 300, maxWidth: "300px", marginBottom: 20 }}>
			<Space direction="horizontal" align="center">
				{icon}
				<Statistic
					title={
						<Typography.Title
							level={4}
							style={{ fontSize: 24, fontWeight: 700 }}
						>
							{title}
						</Typography.Title>
					}
					valueStyle={{ fontWeight: "bold", fontSize: 18 }}
					value={value}
				/>
			</Space>
			{title === "Inventory" && (
				<Badge
					count="eyeglasses"
					style={{
						backgroundColor: "rgba(0,0,255,0.25)",
						color: "black",
						borderRadius: 4,
						paddingLeft: 8,
						paddingRight: 8,
					}}
				/>
			)}
			{title === "Orders" && (
				<Badge
					count="saleData"
					style={{
						backgroundColor: "rgba(0,255,0,0.25)",
						color: "black",
						borderRadius: 4,
						paddingLeft: 8,
						paddingRight: 8,
					}}
				/>
			)}
			{title === "Customer" && (
				<Badge
					count="Customer"
					style={{
						backgroundColor: "rgba(0,255,255,0.25)",
						color: "black",
						borderRadius: 4,
						paddingLeft: 8,
						paddingRight: 8,
					}}
				/>
			)}
		</Card>
	);
}

function RecentOrders() {
	const [weeklySalesData, setWeeklySalesData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { data: weeklyData } = useFetchWeeklySalesQuery("");
	console.log(weeklyData?.data);
	useEffect(() => {
		setLoading(true);
		if (Array.isArray(weeklyData)) setWeeklySalesData(weeklyData);
		setLoading(false);
	}, [weeklyData]);
	console.log(weeklySalesData);

	return (
		<>
			<Typography.Text
				style={{
					fontWeight: 700,
					fontSize: "22px",
					marginTop: "30px",
					paddingBottom: "20px",
					textAlign: "center",
				}}
			>
				Recent Orders
			</Typography.Text>
			<Table
				columns={[
					{
						title: <b>Buyer Name</b>,
						dataIndex: "buyerName",
						key: "buyerName",
					},
					{
						title: <b>Quantity</b>,
						dataIndex: "quantity",
						key: "quantity",
					},
					{
						title: <b>Sale Date</b>,
						dataIndex: "saleDate",
						key: "saleDate",
						render: (date: any) =>
							moment(date).format("MMM D, YYYY"),
					},
				]}
				loading={loading}
				dataSource={weeklyData?.data}
				pagination={false}
				style={{ width: "100%", maxWidth: "920px" }}
			/>
		</>
	);
}

export default Dashboard;
