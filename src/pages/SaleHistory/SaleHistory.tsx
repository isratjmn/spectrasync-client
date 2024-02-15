/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
import { Table, Tabs, Button } from "antd";
import {
	useFetchDailySalesQuery,
	useFetchMonthlySalesQuery,
	useFetchWeeklySalesQuery,
	useFetchYearlySalesQuery,
} from "../../redux/Features/sales/salesApi";
const { TabPane } = Tabs;
import moment from "moment";
import styled from "styled-components";

import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

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

	const handleTabChange = (key: SetStateAction<string>) => {
		setActiveTab(key);
	};
	const columns = [
		{
			title: <b>Buyer Name</b>,
			dataIndex: "buyerName",
			key: "buyerName",
		},
		{
			title: <b>Quantity Sold</b>,
			dataIndex: "quantity",
			key: "quantity",
			render: (text: string) => (
				<span style={{ fontWeight: "bold" }}>{text}</span>
			),
		},
		{
			title: <b>Sale Date</b>,
			dataIndex: "saleDate",
			key: "saleDate",
			render: (date: any) => moment(date).format("MMM D, YYYY"),
		},
		{
			title: <b>Action</b>,
			key: "action",
			render: (record: any) => (
				<Button
					style={{
						color: "black",
						backgroundColor: "rgba(0,0,255,0.25)",
					}}
					type="primary"
					icon={<DownloadOutlined />}
					onClick={() => handleDownloadInvoice(record)}
				>
					Invoice
				</Button>
			),
		},
	];
	const handleDownloadInvoice = (record: any) => {
		

		const invoiceContent = `
		Invoice
    	-----------------------------------------------
		Invoice Number: INV-2024-001
		Date: February 5, 2024
		Due Date: February 15, 2024
		
		Bill To:
		123 Main Street
		Anytown, USA
		12345
		
		Ship To:
		123 Main Street
		Anytown, USA
		12345
    	-----------------------------------------------
		Product ID: ${record?.eyeglassId}\n
		Product Price: ${record?.eyeglassId?.price}\n
		Buyer Name: ${record.buyerName}\n
	  	Quantity Sold: ${record.quantity}\n
	  	Date: ${moment(record.saleDate).format("MMM D, YYYY")}\n

		--------------------------------------------
		Thank you for your business!
		For any inquiries or assistance, please contact with us.
		
		`;

		// Create a new Blob object with the content
		const blob = new Blob([invoiceContent], {
			type: "text/plain;charset=utf-8",
		});

		// Save the blob as a file
		saveAs(blob, `${record.buyerName}_invoice.txt`);
	};
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
