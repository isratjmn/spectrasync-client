/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import {
	useFetchDailySalesQuery,
	useFetchMonthlySalesQuery,
	useFetchWeeklySalesQuery,
	useFetchYearlySalesQuery,
} from "../../redux/Features/sales/salesApi";
const { TabPane } = Tabs;
import styled from "styled-components";

const StyledHeading = styled.h2`
	align-items: center;
	display: flex;
	font-size: 20px;
	padding-bottom: 20px;
	font-weight: 700;
	@media (max-width: 768px) {
		font-size: 17px;
	}
`;

const SalesHistory = () => {
	const [weeklySalesData, setWeeklySalesData] = useState<any[]>([]);
	const [dailySalesData, setDailySalesData] = useState<any[]>([]);
	const [monthlySalesData, setMonthlySalesData] = useState<any[]>([]);
	const [yearlySalesData, setYearlySalesData] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState("weekly");

	const { data: weeklyData } = useFetchWeeklySalesQuery("");
	const { data: dailyData } = useFetchDailySalesQuery("");
	const { data: monthlyData } = useFetchMonthlySalesQuery("");
	const { data: yearlyData } = useFetchYearlySalesQuery("");
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
			title: <b>Quantity Sold</b>,
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: <b>Buyer Name</b>,
			dataIndex: "buyerName",
			key: "buyerName",
		},
		{
			title: <b>Sale Date</b>,
			dataIndex: "saleDate",
			key: "saleDate",
		},
	];
	return (
		<>
			<StyledHeading>Sale History</StyledHeading>
			<Tabs activeKey={activeTab} onChange={handleTabChange}>
				<TabPane tab="Weekly" key="weekly">
					{Array.isArray(weeklySalesData) && (
						<Table
							columns={columns}
							dataSource={weeklyData?.data}
						/>
					)}
				</TabPane>
				<TabPane tab="Daily" key="daily">
					{Array.isArray(dailySalesData) && (
						<Table columns={columns} dataSource={dailyData?.data} />
					)}
				</TabPane>
				<TabPane tab="Monthly" key="monthly">
					{Array.isArray(monthlySalesData) && (
						<Table
							columns={columns}
							dataSource={monthlyData?.data}
						/>
					)}
				</TabPane>
				<TabPane tab="Yearly" key="yearly">
					{Array.isArray(yearlySalesData) && (
						<Table
							columns={columns}
							dataSource={yearlyData?.data}
						/>
					)}
				</TabPane>
			</Tabs>
		</>
	);
};

export default SalesHistory;
