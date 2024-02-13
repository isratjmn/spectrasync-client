/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Table,
	Spin,
	Space,
	Button,
	Popconfirm,
	message,
	Modal,
	Input,
	Form,
	Col,
	Row,
} from "antd";
import {
	useGetEyeGlassesQuery,
	useUpdateEyeGlassMutation,
	useDeleteEyeGlassesMutation,
	useBulkDeleteEyeGlassesMutation,
} from "../../redux/Features/product/productApi"; // Import custom hooks from productApi file
import "./EyeGlassesList.css";
import { useMediaQuery } from "react-responsive";
import {
	DeleteOutlined,
	EditOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useAddSaleMutation } from "../../redux/Features/sales/salesApi";
import { Sale } from "../../redux/Features/sales/salesType";
const EyeglassesList = () => {
	const {
		data: eyeglassesList,
		isLoading,
		isError,
	} = useGetEyeGlassesQuery("");
	// const [, setDataSource] = useState([]);
	const [deleteEyeGlasses] = useDeleteEyeGlassesMutation(); // Mutation hook for deleting eyeglasses
	const [updateEyeGlasses] = useUpdateEyeGlassMutation(); // Mutation hook for updating eyeglasses
	const [isModalVisible, setIsModalVisible] = useState(false); // State for controlling visibility of update modal
	const [addSale] = useAddSaleMutation(); // Mutation hook for adding sale
	const [form] = Form.useForm(); // Form hook for managing form data
	const [selectedEyeglass, setSelectedEyeglass] = useState<any>(null); // State for storing selected eyeglass
	const [, setIsLoading] = useState(false); // State for loading indicator
	const [sellModalVisible, setSellModalVisible] = useState(false); // State for controlling visibility of sell modal
	const [selectedRows, setSelectedRows] = useState<string[]>([]); // State for storing selected rows for bulk delete
	const [bulkDeleteEyeGlasses] = useBulkDeleteEyeGlassesMutation(); // Mutation hook for bulk deleting eyeglasses
	/* useEffect(() => {
		if (eyeglassesList) {
			const filteredEyeglasses = eyeglassesList.filter(
				(eyeglass: { isDeleted: any }) => !eyeglass.isDeleted
			);
			setDataSource(filteredEyeglasses);
		}
	}, [eyeglassesList]); */
	//? Function to show update modal and set selected eyeglass
	const showModal = (eyeglass: any) => {
		setSelectedEyeglass(eyeglass);
		setIsModalVisible(true);
		form.setFieldsValue(eyeglass);
	};
	//? Function to handle update of eyeglass
	const handleUpdate = async () => {
		try {
			const updatedEyeglassValues = await form.validateFields();
			const { _id } = selectedEyeglass;
			const updatedEyeglass = { _id, ...updatedEyeglassValues };
			await updateEyeGlasses(updatedEyeglass).unwrap();
			message.success("Eye glasses updated successfully");
			setIsModalVisible(false);
		} catch (error) {
			message.error(
				"Failed to update eye glasses. Please try again later."
			);
		}
	};
	//? Media query hooks for responsive design
	const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 769px) and (max-width: 1024px)",
	});
	let pageSize = 6;
	if (isSmallScreen) {
		pageSize = 4;
	} else if (isMediumScreen) {
		pageSize = 5;
	}
	//? Function to handle deletion of eyeglass
	const handleDelete = (id: any) => {
		console.log(id);
		try {
			deleteEyeGlasses(id).then((res) => {
				if ("data" in res && res.data?.success) {
					message.success("Selected Eyeglasses Deleted!!!");
				}
			});
		} catch (error) {
			message.error(
				"Failed to delete eye glasses. Please try again later."
			);
		} finally {
			setIsLoading(false);
		}
	};
	//? Function to handle bulk deletion of eyeglasses
	const handleBulkDelete = () => {
		try {
			bulkDeleteEyeGlasses(selectedRows).then((res) => {
				if ("data" in res && res.data?.success) {
					message.success("Selected Eyeglasses Deleted!!!");
				}
			});
			setSelectedRows([]);
		} catch (error) {
			message.error(
				"Failed to Delete Selected Eyeglasses. Please try again later."
			);
		}
	};
	//? Function to handle selling of eyeglasses
	const handleSell = (eyeglassId: any) => {
		setSellModalVisible(true);
		setSelectedEyeglass(eyeglassId);
	};
	//? Function to handle sell form submission
	const handleSellFormSubmit = async () => {
		try {
			const values = await form.validateFields();
			const { quantity, buyerName, saleDate } = values;
			if (quantity > selectedEyeglass?.quantity) {
				message.error("Quantity exceeds available stock.");
				return;
			}
			const saleData: Sale = {
				eyeglassId: selectedEyeglass?._id,
				quantity: parseInt(quantity),
				buyerName,
				saleDate,
			};
			await addSale(saleData);
			message.success("Product sold successfully.");
			setSellModalVisible(false);
			form.resetFields();
			const updatedEyeglass = {
				...selectedEyeglass,
				quantity: selectedEyeglass.quantity - parseInt(quantity),
			};
			await updateEyeGlasses(updatedEyeglass);
			if (updatedEyeglass.quantity === 0) {
				await handleDelete(updatedEyeglass._id);
			}
		} catch (error) {
			message.error("Failed to sell product. Please try again later.");
		}
	};
	//? Define columns for the table
	const columns = [
		{
			title: "Select",
			key: "select",
			render: (_text: any, record: { _id: string }) => (
				<input
					type="checkbox"
					onChange={(e) => {
						const checked = e.target.checked;
						if (checked) {
							setSelectedRows((prevSelectedRows) => [
								...prevSelectedRows,
								record._id,
							]);
						} else {
							setSelectedRows((prevSelectedRows) =>
								prevSelectedRows.filter(
									(rowId) => rowId !== record._id
								)
							);
						}
					}}
					checked={selectedRows.includes(record._id)}
				/>
			),
		},
		{
			title: <b>Name</b>,
			dataIndex: "name",
			key: "name",
		},
		{
			title: <b>Frame Material</b>,
			dataIndex: "frameMaterial",
			key: "frameMaterial",
		},
		{
			title: <b>Frame Shape</b>,
			dataIndex: "frameShape",
			key: "frameShape",
		},
		{
			title: <b>Lens Type</b>,
			dataIndex: "lensType",
			key: "lensType",
		},
		{
			title: <b>Brand</b>,
			dataIndex: "brand",
			key: "brand",
		},
		{
			title: <b>Price</b>,
			dataIndex: "price",
			key: "price",
		},
		{
			title: (
				<b style={{ fontWeight: "bold", color: "blue" }}>Quantity</b>
			),
			dataIndex: "quantity",
			key: "quantity",
			render: (text: any) => (
				<span style={{ fontWeight: "700", color: "blue" }}>{text}</span>
			),
		},
		{
			title: <b>Color</b>,
			dataIndex: "color",
			key: "color",
		},
		{
			title: <b>Price Range</b>,
			dataIndex: "priceRange",
			key: "priceRange",
		},
		{
			title: <b>Gender</b>,
			dataIndex: "gender",
			key: "gender",
		},
		{
			title: <b>Action</b>,
			key: "action",
			render: (_text: any, record: { _id: string }) => (
				<Space size="middle">
					<Button
						type="primary"
						icon={<ShoppingOutlined />}
						style={{
							backgroundColor: "green",
							borderColor: "green",
						}}
						onClick={() => handleSell(record)}
					></Button>
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => showModal(record)}
					></Button>
					<Popconfirm
						title="Are you sure to delete this eye glasses?"
						onConfirm={() => handleDelete(record._id)}
						okText="Yes"
						cancelText="No"
					>
						<Button
							type="primary"
							danger
							icon={<DeleteOutlined />}
						></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	//? Conditional rendering for loading state
	if (isLoading)
		return <Spin style={{ alignItems: "center" }} size="large" />;
	if (isError) return <div>Error Fetching Data</div>;

	//? Reverse the order of eyeglasses list
	const reversedEyeglassesList = [...eyeglassesList].reverse();

	//? Sell modal component
	const sellModal = (
		<Modal
			title="Sell Product"
			open={sellModalVisible}
			onCancel={() => setSellModalVisible(false)}
			onOk={handleSellFormSubmit}
		>
			<Form form={form} initialValues={{ quantity: 8 }} layout="vertical">
				<Form.Item
					name="quantity"
					label="Quantity"
					rules={[
						{ required: true, message: "Please enter quantity." },
					]}
				>
					<Input
						type="number"
						min={1}
						max={selectedEyeglass?.quantity}
					/>
				</Form.Item>
				<Form.Item
					name="buyerName"
					label="Buyer Name"
					rules={[
						{ required: true, message: "Please enter buyer name." },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="saleDate"
					label="Sale Date"
					rules={[
						{ required: true, message: "Please select sale date." },
					]}
				>
					<Input type="date" />
				</Form.Item>
			</Form>
		</Modal>
	);
	//? Return table component with data
	return (
		<div className="table-responsive">
			<div
				style={{
					marginTop: "8px",
					marginBottom: "15px",
				}}
			>
				<Button
					type="primary"
					danger
					onClick={handleBulkDelete}
					disabled={selectedRows.length === 0}
				>
					Bulk Delete
				</Button>
			</div>
			<Table
				dataSource={reversedEyeglassesList}
				columns={columns}
				pagination={{ pageSize }}
				scroll={{ x: "auto" }}
			/>
			{sellModal}
			<Modal
				title={
					<span style={{ fontWeight: "bold" }}>Duplicate & Edit</span>
				}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={[
					<Button key="back" onClick={() => setIsModalVisible(false)}>
						Cancel
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={isLoading}
						onClick={handleUpdate}
					>
						Update
					</Button>,
				]}
			>
				<Form form={form} layout="vertical">
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="name"
								label="Name"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="frameMaterial"
								label="Frame Material"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="frameShape"
								label="Frame Shape"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="lensType"
								label="Lens Type"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="brand"
								label="Brand"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="price"
								label="Price"
								rules={[{ required: true }]}
							>
								<Input type="number" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="quantity"
								label={
									<span
										style={{
											color: "#00FFFF",
											fontWeight: "bold",
										}}
									>
										Quantity
									</span>
								}
								rules={[{ required: true }]}
							>
								<Input
									type="number"
									style={{
										color: "#00FFFF",
										fontWeight: "bold",
									}}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="color"
								label="Color"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="priceRange"
								label="Price Range"
								rules={[{ required: true }]}
							>
								<Input type="number" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="gender"
								label="Gender"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>
	);
};

export default EyeglassesList;
