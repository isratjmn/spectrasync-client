/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
// 	ShoppingCartOutlined,
// 	ShoppingOutlined,
// 	UserOutlined,
// } from "@ant-design/icons";
// import { Card, Space, Statistic, Table, Typography } from "antd";
// import { useEffect, useState } from "react";
// import {
// 	Chart as ChartJS,
// 	CategoryScale,
// 	LinearScale,
// 	BarElement,
// 	Title,
// 	Tooltip,
// 	Legend,
// } from "chart.js";
// import { getCustomers, getInventory, getOrders } from "../../api";
// ChartJS.register(
// 	CategoryScale,
// 	LinearScale,
// 	BarElement,
// 	Title,
// 	Tooltip,
// 	Legend
// );

// function Dashboard() {
// 	const [orders, setOrders] = useState<number>(0);
// 	const [inventory, setInventory] = useState<number>(0);
// 	const [customers, setCustomers] = useState<number>(0);

// 	useEffect(() => {
// 		getOrders().then((res) => {
// 			setOrders(res.total);
// 		});
// 		getInventory().then((res) => {
// 			setInventory(res.total);
// 		});
// 		getCustomers().then((res) => {
// 			setCustomers(res.total);
// 		});
// 	}, []);

// 	return (
// 		<div
// 			style={{
// 				display: "flex",
// 				justifyContent: "center",
// 				alignItems: "center",

// 			}}
// 		>
// 			<Space size={20} direction="vertical">
// 				<Typography.Title
// 					style={{ fontWeight: 800, fontSize: "28px", }}
// 					level={4}
// 				>
// 					User Dashboard
// 				</Typography.Title>
// 				<Space
// 					direction="horizontal"
// 					wrap
// 					style={{ overflowX: "auto" }}
// 				>
// 					<DashboardCard
// 						icon={
// 							<ShoppingCartOutlined
// 								style={{
// 									color: "green",
// 									backgroundColor: "rgba(0,255,0,0.25)",
// 									borderRadius: 20,
// 									fontSize: 24,
// 									padding: 8,
// 								}}
// 							/>
// 						}
// 						title={"Orders"}
// 						value={orders}
// 					/>
// 					<DashboardCard
// 						icon={
// 							<ShoppingOutlined
// 								style={{
// 									color: "blue",
// 									backgroundColor: "rgba(0,0,255,0.25)",
// 									borderRadius: 20,
// 									fontSize: 24,
// 									padding: 8,
// 								}}
// 							/>
// 						}
// 						title={"Inventory"}
// 						value={inventory}
// 					/>
// 					<DashboardCard
// 						icon={
// 							<UserOutlined
// 								style={{
// 									color: "purple",
// 									backgroundColor: "rgba(0,255,255,0.25)",
// 									borderRadius: 20,
// 									fontSize: 24,
// 									padding: 8,
// 								}}
// 							/>
// 						}
// 						title={"Customer"}
// 						value={customers}
// 					/>
// 				</Space>
// 				<Space direction="horizontal" wrap>
// 					<RecentOrders />
// 				</Space>
// 			</Space>
// 		</div>
// 	);
// }

// interface DashboardCardProps {
// 	icon: JSX.Element;
// 	title: string;
// 	value: number;
// }

// function DashboardCard({ title, value, icon }: DashboardCardProps) {
// 	return (
// 		<Card style={{ width: 300, flex: "1 1 300px", marginBottom: 20 }}>
// 			<Space direction="horizontal">
// 				{icon}
// 				<Statistic
// 					title={
// 						<Typography.Title
// 							level={4}
// 							style={{ fontSize: 20, fontWeight: 700 }}
// 						>
// 							{title}
// 						</Typography.Title>
// 					}
// 					value={value}
// 				/>
// 			</Space>
// 		</Card>
// 	);
// }

// function RecentOrders() {
// 	const [dataSource, setDataSource] = useState<any[]>([]);
// 	const [loading, setLoading] = useState<boolean>(false);
// 	useEffect(() => {
// 		setLoading(true);
// 		getOrders().then((res) => {
// 			setDataSource(res.products.splice(0, 10));
// 			setLoading(false);
// 		});
// 	}, []);
// 	return (
// 		<>
// 			<Typography.Text
// 				style={{
// 					fontWeight: 700,
// 					fontSize: "16px",
// 					marginBottom: "20px",
// 					paddingBottom: "20px",
// 				}}
// 			>
// 				Recent Orders
// 			</Typography.Text>
// 			<Table
// 				columns={[
// 					{ title: "Title", dataIndex: "title" },
// 					{ title: "Quantity", dataIndex: "quantity" },
// 					{ title: "Price", dataIndex: "discountedPrice" },
// 				]}
// 				loading={loading}
// 				dataSource={dataSource}
// 				pagination={false}
// 				style={{ width: 920 }}
// 			/>
// 		</>
// 	);
// }

// export default Dashboard;

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

	useEffect(() => {
		getOrders().then((res) => {
			setOrders(res.total);
		});
		getInventory().then((res) => {
			setInventory(res.total);
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
			<Typography.Text
				style={{
					fontWeight: 700,
					fontSize: "18px",
					marginTop: "30px",
					paddingBottom: "20px",
					textAlign: "center",
				}}
			>
				Recent Orders
			</Typography.Text>
			<Table
				columns={[
					{ title: "Title", dataIndex: "title" },
					{ title: "Quantity", dataIndex: "quantity" },
					{ title: "Price", dataIndex: "discountedPrice" },
				]}
				loading={loading}
				dataSource={dataSource}
				pagination={false}
				style={{ width: "100%", maxWidth: "920px" }}
			/>
		</>
	);
}

export default Dashboard;
