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
	Pagination,
} from "antd";
import {
	useGetEyeGlassesQuery,
	useUpdateEyeGlassMutation,
	useDeleteEyeGlassesMutation,
	useBulkDeleteEyeGlassesMutation,
} from "../../redux/Features/product/productApi";
import "./EyeGlassesList.css";
import {
	DeleteOutlined,
	EditOutlined,
	SearchOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useAddSaleMutation } from "../../redux/Features/sales/salesApi";
import { Sale } from "../../redux/Features/sales/salesType";
import SearchFilter from "./SearchFilter";
// import { useMediaQuery } from "react-responsive";

const EyeglassesList = () => {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(6);
	const {
		data: eyeglassesList,
		isLoading,
		isError,
	} = useGetEyeGlassesQuery({ page, limit: pageSize });

	console.log("Eyeglasses list data:", eyeglassesList);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [deleteEyeGlasses] = useDeleteEyeGlassesMutation();
	const [updateEyeGlasses] = useUpdateEyeGlassMutation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [addSale] = useAddSaleMutation();
	const [form] = Form.useForm();
	const [selectedEyeglass, setSelectedEyeglass] = useState<any>(null);
	const [, setIsLoading] = useState(false);
	const [sellModalVisible, setSellModalVisible] = useState(false);
	const [bulkDeleteEyeGlasses] = useBulkDeleteEyeGlassesMutation();
	const handlePageChange = (page: number, pageSize?: number) => {
		setPage(page);
		setPageSize(pageSize || 6);
	};
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
	//? Function to handle deletion of eyeglass
	const handleDelete = (id: any) => {
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

	/* const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 769px) and (max-width: 1024px)",
	});
	let pageSize = 6;
	if (isSmallScreen) {
		pageSize = 4;
	} else if (isMediumScreen) {
		pageSize = 5;
	} */
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
			title: <b>profile Image</b>,
			dataIndex: "profileImg",
			key: "profileImg",
			render: (profileImg: string) => (
				<img
					src={profileImg}
					alt="Profile"
					style={{ maxWidth: "50px" }}
				/>
			),
		},
		{
			title: <b>Name</b>,
			dataIndex: "name",
			key: "name",
			filterDropdown: ({
				setSelectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<SearchFilter
					placeholder="Search name"
					filterFn={(value: any) =>
						setSelectedKeys(value ? [value] : [])
					}
					confirm={confirm}
					clearFilters={clearFilters}
				/>
			),
			filterIcon: (filtered: any) => (
				<SearchOutlined
					style={{ color: filtered ? "#1890ff" : undefined }}
				/>
			),
			onFilter: (value: any, record: any) =>
				record.name.toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: <b>Frame Material</b>,
			dataIndex: "frameMaterial",
			key: "frameMaterial",
			filters: [
				{ text: "Plastic", value: "Plastic" },
				{ text: "Metal", value: "Metal" },
				{ text: "Acetate", value: "Acetate" },
				{ text: "Wood", value: "Wood" },
			],
			onFilter: (value: string, record: any) =>
				record.frameMaterial.includes(value),
		},
		{
			title: <b>Frame Shape</b>,
			dataIndex: "frameShape",
			key: "frameShape",
			filterDropdown: ({
				setSelectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<SearchFilter
					placeholder="Search Frame Shape"
					filterFn={(value: any) =>
						setSelectedKeys(value ? [value] : [])
					}
					confirm={confirm}
					clearFilters={clearFilters}
				/>
			),
			filterIcon: (filtered: any) => (
				<SearchOutlined
					style={{ color: filtered ? "#1890ff" : undefined }}
				/>
			),
			onFilter: (value: any, record: any) =>
				record.frameShape.toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: <b>Lens Type</b>,
			dataIndex: "lensType",
			key: "lensType",
			filterDropdown: ({
				setSelectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<SearchFilter
					placeholder="Search Lens Type"
					filterFn={(value: any) =>
						setSelectedKeys(value ? [value] : [])
					}
					confirm={confirm}
					clearFilters={clearFilters}
				/>
			),
			filterIcon: (filtered: any) => (
				<SearchOutlined
					style={{ color: filtered ? "#1890ff" : undefined }}
				/>
			),
			onFilter: (value: string, record: { lensType: string }) =>
				record.lensType.toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: <b>Brand</b>,
			dataIndex: "brand",
			key: "brand",
			filters: [
				{ text: "Ray-Ban", value: "Ray-Ban" },
				{ text: "Oakley", value: "Oakley" },
				{ text: "Gucci", value: "Gucci" },
				{ text: "Prada", value: "Prada" },
				{ text: "Versace", value: "Versace" },
				{ text: "Tom Ford", value: "Tom Ford" },
			],
			onFilter: (value: any, record: any) => record.brand.includes(value),
		},
		{
			title: <b>Price</b>,
			dataIndex: "price",
			key: "price",
			sorter: (a: { price: number }, b: { price: number }) =>
				a.price - b.price,
		},
		{
			title: (
				<b style={{ fontWeight: "bold", color: "blue" }}>Quantity</b>
			),
			dataIndex: "quantity",
			key: "quantity",
			sorter: (a: { quantity: number }, b: { quantity: number }) =>
				a.quantity - b.quantity,
			render: (text: any) => (
				<span style={{ fontWeight: "700", color: "blue" }}>{text}</span>
			),
		},
		{
			title: <b>Color</b>,
			dataIndex: "color",
			key: "color",
			filters: [
				{ text: "Black", value: "Black" },
				{ text: "Brown", value: "Brown" },
				{ text: "Silver", value: "Silver" },
				{ text: "Gold", value: "Gold" },
				{ text: "Blue", value: "Blue" },
			],
			onFilter: (value: any, record: any) => record.color.includes(value),
		},
		{
			title: <b>Price Range</b>,
			dataIndex: "priceRange",
			key: "priceRange",
			sorter: (a: { priceRange: number }, b: { priceRange: number }) =>
				a.priceRange - b.priceRange,
		},
		{
			title: <b>Gender</b>,
			dataIndex: "gender",
			key: "gender",
			filters: [
				{ text: "Male", value: "Male" },
				{ text: "Female", value: "Female" },
				{ text: "Others", value: "Others" },
			],
			onFilter: (value: string, record: any) =>
				record.gender.includes(value),
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
				dataSource={eyeglassesList?.data}
				columns={columns}
				pagination={false}
				scroll={{ x: "auto" }}
			/>
			<Pagination
				current={page}
				total={eyeglassesList?.meta?.total || 0}
				pageSize={eyeglassesList?.meta?.limit}
				onChange={handlePageChange}
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
								rules={[
									{
										required: true,
										message: "Please enter the name",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="frameMaterial"
								label="Frame Material"
								rules={[
									{
										required: true,
										message:
											"Please enter the Frame Material",
									},
								]}
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
								rules={[
									{
										required: true,
										message: "Please enter the Frame Shape",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="lensType"
								label="Lens Type"
								rules={[
									{
										required: true,
										message: "Please enter the Lens Type",
									},
								]}
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
								rules={[
									{
										required: true,
										message: "Please enter the Brand Name",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="price"
								label="Price"
								rules={[
									{
										required: true,
										message: "Please enter the Price",
									},
								]}
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
								rules={[
									{
										required: true,
										message: "Please enter the Quantity",
									},
								]}
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
								rules={[
									{
										required: true,
										message: "Please enter the Color",
									},
								]}
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
								rules={[
									{
										required: true,
										message: "Please enter the PriceRange",
									},
								]}
							>
								<Input type="number" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="gender"
								label="Gender"
								rules={[
									{
										required: true,
										message: "Please enter the Gender",
									},
								]}
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
