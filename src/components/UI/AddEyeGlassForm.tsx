/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Card,
	Input,
	Button,
	Space,
	message,
	Select,
	Form,
	Col,
	Row,
	// Upload,
} from "antd";

import { useAddEyeGlassesMutation } from "../../redux/Features/product/productApi";
// import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddEyeGlassForm = () => {
	const [form] = Form.useForm();
	const [addEyeGlasses, { isLoading }] = useAddEyeGlassesMutation();
	// const [fileList, setFileList] = useState<any[]>([]);

	const onFinish = async (values: {
		price: number;
		quantity: number;
		profileImg: (string | Blob)[];
	}) => {
		try {
			values.price = Number(values.price);
			values.quantity = Number(values.quantity);
			const formData = new FormData();
			formData.append("data", JSON.stringify(values));
			formData.append("file", values.profileImg?.[0]);
			await addEyeGlasses(formData).unwrap();
			message.success("Eyeglasses added successfully");
			form.resetFields();
			// setFileList([]);
		} catch (error) {
			message.error("Failed to add eyeglasses. Please try again later.");
		}
	};
	/* const onChange = ({ fileList }: { fileList: any[] }) => {
		const filteredList = fileList.filter(
			(file: { type: string | string[]; name: any }) => {
				if (file.type.includes("image")) {
					return true;
				}
				message.error(`${file.name} is not an image file`);
				return false;
			}
		);
		setFileList(filteredList);
	}; */
	/* const uploadButton = (
		<div
			style={{
				display: "inline-block",
				marginRight: "4px",
				color: "#1890ff",
				fontSize: "13px",
			}}
		>
			<UploadOutlined />
			<div style={{ marginTop: 2 }}>Upload</div>
		</div>
	); */
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "82vh",
			}}
		>
			<Card
				style={{
					width: "85%",
					maxWidth: "800px",
					fontWeight: 500,
					fontSize: "14px",
					marginBottom: "13px",
				}}
				className="responsive-card"
				title="Add Eye Glasses"
			>
				<Form layout="vertical" onFinish={onFinish} form={form}>
					<Space
						direction="vertical"
						style={{
							width: "100%",
						}}
					>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item
									label="Name"
									name="name"
									rules={[
										{
											required: true,
											message: "Please input the name!",
										},
									]}
								>
									<Select
										placeholder="Select a name"
										style={{ width: "100%" }}
									>
										<Option value="Aviator Glasses">
											Aviator Glasses
										</Option>
										<Option value="Wayfarer Glasses">
											Wayfarer Glasses
										</Option>
										<Option value="Cat Eye Glasses">
											Cat Eye Glasses
										</Option>
										<Option value="Browline Glasses">
											Browline Glasses
										</Option>
										<Option value="Computer Glasses">
											Computer Glasses
										</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Price"
									name="price"
									rules={[
										{
											required: true,
											message: "Please input the price!",
										},
									]}
								>
									<Input placeholder="Price" type="number" />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item
									label="Quantity"
									name="quantity"
									rules={[
										{
											required: true,
											message:
												"Please input the quantity!",
										},
									]}
								>
									<Input
										placeholder="Quantity"
										type="number"
										style={{
											fontWeight: "bold",
											color: "blue",
										}}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Frame Material"
									name="frameMaterial"
									rules={[
										{
											required: true,
											message:
												"Please select the frame material!",
										},
									]}
								>
									<Select
										placeholder="Select Frame Material"
										style={{ width: "100%" }}
									>
										<Option value="Metal">Metal</Option>
										<Option value="Plastic">Plastic</Option>
										<Option value="Acetate">Acetate</Option>
										<Option value="Wood">Wood</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item
									label="Price Range"
									name="priceRange"
								>
									<Input
										placeholder="Price Range"
										type="number"
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Gender"
									name="gender"
									rules={[
										{
											required: true,
											message:
												"Please select the gender!",
										},
									]}
								>
									<Select
										placeholder="Select Gender"
										style={{ width: "100%" }}
									>
										<Option value="Male">Male</Option>
										<Option value="Female">Female</Option>
										<Option value="Others">Others</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item
									label="Frame Shape"
									name="frameShape"
								>
									<Input placeholder="Frame Shape" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Lens Type" name="lensType">
									<Input placeholder="Lens Type" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item label="Brand" name="brand">
									<Input placeholder="Brand" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Color" name="color">
									<Input placeholder="Color" />
								</Form.Item>
							</Col>
						</Row>
						{/* <Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item
									label="Upload Image"
									name="profileImg"
									valuePropName="fileList"
									getValueFromEvent={onChange}
									style={{ marginBottom: "2px" }}
								>
									<Upload
										beforeUpload={() => false}
										listType="picture-card"
										fileList={fileList}
										onChange={onChange}
									>
										{fileList.length >= 1
											? null
											: uploadButton}
									</Upload>
								</Form.Item>
							</Col>
						</Row> */}
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={isLoading}
								style={{ width: "100%" }}
							>
								Add Glasses
							</Button>
						</Form.Item>
					</Space>
				</Form>
			</Card>
		</div>
	);
};

export default AddEyeGlassForm;
