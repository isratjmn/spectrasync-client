/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, Input, Button, Space, message, Radio } from "antd";
import { useAddEyeGlassesMutation } from "../../redux/Features/product/productApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store/store";
import { fetchProductsStart } from "../../redux/Features/product/productSlice";

const AddEyeGlassesForm = () => {
	const dispatch = useDispatch();
	const { error } = useSelector((state: RootState) => state.product);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [frameMaterial, setFrameMaterial] = useState("");
	const [frameShape, setFrameShape] = useState("");
	const [lensType, setLensType] = useState("");
	const [brand, setBrand] = useState("");
	const [color, setColor] = useState("");
	const [priceRange, setPriceRange] = useState("");
	const [gender, setGender] = useState("");
	const [loading, setLoading] = useState(false);
	const [addEyeGlasses] = useAddEyeGlassesMutation();

	const handleSubmit = async () => {
		try {
			setLoading(true);
			await addEyeGlasses({
				name,
				price: parseFloat(price),
				quantity: parseInt(quantity),
				frameMaterial,
				frameShape,
				lensType,
				brand,
				color,
				priceRange,
				gender,
			}).unwrap();
			dispatch(fetchProductsStart());
			setName("");
			setPrice("");
			setQuantity("");
			setFrameMaterial("");
			setFrameShape("");
			setLensType("");
			setBrand("");
			setColor("");
			setPriceRange("");
			setGender("");

			message.success("Eye glasses added successfully");
		} catch (error: any) {
			message.error(
				error.message ||
					"Failed to add eye glasses. Please try again later."
			);
		} finally {
			setTimeout(() => setLoading(false), 1000);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				background:
					"linear-gradient(to right, rgba(255, 236, 210, 0.4), rgba(252, 182, 159, 0.2))",
			}}
		>
			<Card
				title={
					<span style={{ fontWeight: "bold", fontSize: "18px" }}>
						<b>Add Eye Glasses</b>
					</span>
				}
			>
				<Space
					direction="vertical"
					style={{
						width: "600px",
						maxWidth: "1000px",
					}}
				>
					<div>
						<label>Name:</label>
						<Input
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label>Price:</label>
						<Input
							placeholder="Price"
							value={price}
							type="number"
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div>
						<label>Quantity:</label>
						<Input
							placeholder="Quantity"
							type="number"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</div>
					<div>
						<label>Frame Material:</label>
						<Input
							placeholder="Frame Material"
							value={frameMaterial}
							onChange={(e) => setFrameMaterial(e.target.value)}
						/>
					</div>
					<div>
						<label>Frame Shape:</label>
						<Input
							placeholder="Frame Shape"
							value={frameShape}
							onChange={(e) => setFrameShape(e.target.value)}
						/>
					</div>
					<div>
						<label>Lens Type:</label>
						<Input
							placeholder="Lens Type"
							value={lensType}
							onChange={(e) => setLensType(e.target.value)}
						/>
					</div>
					<div>
						<label>Brand:</label>
						<Input
							placeholder="Brand"
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
						/>
					</div>
					<div>
						<label>Color:</label>
						<Input
							placeholder="Color"
							type="number"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</div>
					<div>
						<label>Price Range:</label>
						<Input
							placeholder="Price Range"
							type="number"
							value={priceRange}
							onChange={(e) => setPriceRange(e.target.value)}
						/>
					</div>
					<div>
						<label>Gender:</label>
						<br />
						<Radio.Group
							onChange={(e) => setGender(e.target.value)}
							value={gender}
						>
							<Radio value="Male">Male</Radio>
							<Radio value="Female">Female</Radio>
						</Radio.Group>
					</div>

					<Button
						type="primary"
						onClick={handleSubmit}
						loading={loading}
						style={{ marginTop: "10px" }}
					>
						Add Glasses
					</Button>
					{error && <div>Error: {error}</div>}
				</Space>
			</Card>
		</div>
	);
};

export default AddEyeGlassesForm;
