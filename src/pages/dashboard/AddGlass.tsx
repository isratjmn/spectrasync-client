import { FieldValues, useForm } from "react-hook-form";
import { useAddEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";
import { Button, Input } from "@material-tailwind/react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddGlass = () => {
	const image_upload_url = `https://api.imgbb.com/1/upload?expiration=600&key=${image_upload_token}`;

	const { register, handleSubmit, reset } = useForm();
	const [addGlass] = useAddEyeGlassMutation();
	const user = useAppSelector(selectCurrentUser);

	const onSubmit = (data: FieldValues) => {
		const toastId = toast.loading("Please wait...");
		try {
			const formData = new FormData();
			formData.append("image", data.productImage[0]);
			fetch(image_upload_url, {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then(async (profileResponse) => {
					if (profileResponse.success) {
						const productImageURL =
							profileResponse.data.display_url;
						const productPriceConvert = Number(data.productPrice);
						const productQuantityConvert = Number(
							data.productQuantity
						);

						const {
							productName,
							frameMaterial,
							frameShape,
							lensType,
							brand,
							gender,
							color,
						} = data;

						const glassData = {
							productName,
							productPrice: productPriceConvert,
							productQuantity: productQuantityConvert,
							productImage: productImageURL,
							frameMaterial,
							frameShape,
							lensType,
							brand,
							gender,
							color,
							userEmail: user?.email,
						};
						await addGlass(glassData);
						toast.success("Product added successfully!", {
							id: toastId,
							duration: 2000,
						});
						reset();
					}
				});
		} catch (error) {
			toast.error("Something went wrong!", {
				id: toastId,
				duration: 2000,
			});
		}
	};

	return (
		<div className="my-4 mx-auto">
			<h1 className="font-extrabold text-2xl text-deep-purple-900 mt-10 py-4 mx-auto ms-32 lg:ms-24">
				Add Glass
			</h1>
			<form
				className=" w-[380px] md:w-[600px] lg:w-[60%] ms-32 lg:ms-24"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-5">
					<div>
						<Input
							{...register("productName")}
							type="text"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Product Name"
						/>
					</div>
					<div>
						<Input
							{...register("productPrice")}
							type="number"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Product Price"
						/>
					</div>
					<div>
						<Input
							{...register("productQuantity")}
							type="number"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Product Quantity"
						/>
					</div>
					<div>
						<Input
							{...register("frameMaterial")}
							type="text"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Frame Material"
						/>
					</div>
					<div>
						<Input
							{...register("frameShape")}
							type="text"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Frame Shape"
						/>
					</div>
					<div>
						<Input
							{...register("lensType")}
							type="text"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Lens Type"
						/>
					</div>
					<div>
						<Input
							{...register("brand")}
							type="text"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Brand"
						/>
					</div>
					<div>
						<Input
							{...register("color")}
							type="text"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Color"
						/>
					</div>
					<div>
						<div className="relative">
							<select
								className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								{...register("gender")}
							>
								<option className="py-2">Select Gender</option>
								<option className="py-2" value="Male">
									Male
								</option>
								<option className="py-2" value="Female">
									Female
								</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									className="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M7.293 10.707a1 1 0 0 1 1.414 0L10 12.086l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414z"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div>
						<Input
							{...register("productImage")}
							type="file"
							crossOrigin={""}
							placeholder=""
							color="indigo"
							label="Product Image"
						/>
					</div>
				</div>
				<div className="flex float-end">
					<Button
						loading={false}
						fullWidth
						type="submit"
						variant="gradient"
						size="sm"
						color="indigo"
						placeholder={""}
						className="w-full"
					>
						Add Glass
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddGlass;
