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
	Upload,
} from "antd";
import { useAddEyeGlassesMutation } from "../../redux/Features/product/productApi";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

const AddEyeGlassForm = () => {
	const [form] = Form.useForm();
	const [addEyeGlasses, { isLoading }] = useAddEyeGlassesMutation();
	const [fileList, setFileList] = useState<any[]>([]);
	const onFinish = async (values: {
		image: string;
		price: number;
		quantity: number;
	}) => {
		try {
			values.price = Number(values.price);
			values.quantity = Number(values.quantity);

			const formData = new FormData();
			formData.append("data", JSON.stringify(values));
			formData.append("file", values.image);
			console.log(values.image);
			// await addEyeGlasses(formData).unwrap();

			await addEyeGlasses(formData);

			message.success("Eyeglasses Added Successfully!!");
			form.resetFields();
			setFileList([]);
		} catch (error) {
			message.error("Failed to add Eyeglasses. Please try again later.");
		}
	};
	const onChange = ({ fileList }: { fileList: any[] }) => {
		setFileList(fileList);
	};

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
											message: "Please input the Name!!",
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
											message: "Please input the Price!",
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
												"Please input the Quantity!",
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
												"Please select the Frame Material!",
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
									rules={[
										{
											required: true,
											message:
												"Please select the Price Range!",
										},
									]}
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
												"Please select the Gender!",
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
									rules={[
										{
											required: true,
											message:
												"Please select the Frame Shape!",
										},
									]}
								>
									<Input placeholder="Frame Shape" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Lens Type"
									name="lensType"
									rules={[
										{
											required: true,
											message:
												"Please select the Lens Type!",
										},
									]}
								>
									<Input placeholder="Lens Type" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item
									label="Brand"
									name="brand"
									rules={[
										{
											required: true,
											message: "Please select the Brand!",
										},
									]}
								>
									<Select placeholder="Select Brand">
										<Option value="Ray-Ban">Ray-Ban</Option>
										<Option value="Oakley">Oakley</Option>
										<Option value="Prada">Prada</Option>
										<Option value="Gucci">Gucci</Option>
										<Option value="Versace">Versace</Option>
										<Option value="Dolce & Gabbana">
											Dolce & Gabbana
										</Option>
										<Option value="Armani">Armani</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Color"
									name="color"
									rules={[
										{
											required: true,
											message: "Please select the Color!",
										},
									]}
								>
									<Select placeholder="Select Color">
										<Select.Option value="Black">
											Black
										</Select.Option>
										<Select.Option value="Brown">
											Brown
										</Select.Option>
										<Select.Option value="Silver">
											Silver
										</Select.Option>
										<Select.Option value="Gold">
											Gold
										</Select.Option>
										<Select.Option value="Blue">
											Blue
										</Select.Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item
									name="image"
									style={{ marginBottom: "2px" }}
								>
									<Upload
										fileList={fileList}
										onChange={({ fileList }) =>
											onChange({ fileList })
										}
										beforeUpload={() => false}
										maxCount={1}
										listType="picture"
									>
										<Button icon={<UploadOutlined />}>
											Upload Image
										</Button>
									</Upload>
								</Form.Item>
							</Col>
						</Row>
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
