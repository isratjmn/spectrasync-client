/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { Button, Select, Typography, message } from "antd";
import "./Regisster.css";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { registerUser } from "../../redux/Features/auth/authSlice";
import { useRegisterMutation } from "../../redux/Features/auth/authApi";
const { Option } = Select;

interface FormData {
	username: string;
	email: string;
	password: string;
	role: string;
}

const StyledForm = styled.form`
	width: 100%;
	max-width: 450px;
	margin: 0 auto;
	text-align: left;
	padding: 20px;
	border-radius: 8px;
	background-color: #fff;
`;

const StyledLabel = styled.label`
	display: block;
	margin-bottom: 6px;
	line-height: 1.6;
	color: #333;
	font-size: 14px;
	font-weight: 600;
	text-align: left;
	font-family: "Open Sans", sans-serif;
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 12px;
	margin-bottom: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
`;

const StyledButton = styled(Button)`
	width: 100%;
`;

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm<FormData>({
		defaultValues: { role: "user" },
	});
	const [registerData] = useRegisterMutation();
	const onSubmit = async (data: FormData) => {
		try {
			const res = await registerData(data).unwrap();
			dispatch(registerUser(res));
			navigate("/dashboard");
			message.success({
				content: "Registration Successful!",
				style: {
					bottom: 20,
					right: 20,
				},
			});
		} catch (error: any) {
			message.error({
				content:
					error.message || "Registration failed. Please try again.",
				style: {
					bottom: 20,
					right: 20,
				},
			});
		}
	};

	return (
		<>
			<div className="register-container">
				<StyledForm
					onSubmit={handleSubmit(onSubmit)}
					style={{
						padding: "30px",
					}}
				>
					<Typography.Title
						style={{
							textAlign: "center",
							fontWeight: 700,
							fontSize: "30px",
							marginBottom: "40px",
							marginTop: "20px",
							color: "#000",
						}}
						level={4}
					>
						Please Register !!
					</Typography.Title>
					<StyledLabel>
						Username:
						<StyledInput
							type="text"
							{...register("username", {
								required: "Please enter your username",
							})}
						/>
					</StyledLabel>

					<StyledLabel>
						Email:
						<StyledInput
							type="email"
							{...register("email", {
								required: "Please enter your email",
							})}
						/>
					</StyledLabel>

					<StyledLabel>
						Password:
						<StyledInput
							type="password"
							{...register("password", {
								required: "Please enter your password",
							})}
						/>
					</StyledLabel>

					<StyledLabel>
						Role:
						<Select
							defaultValue="user"
							onChange={(value) => console.log(value)}
							style={{ width: "100%", marginBottom: "15px" }}
						>
							<Option value="user">User</Option>
							<Option value="manager">Manager</Option>
						</Select>
					</StyledLabel>
					<StyledButton type="primary" htmlType="submit">
						Register
					</StyledButton>
					<Typography
						style={{
							marginTop: "20px",
							justifyContent: "center",
							display: "flex",
							gap: 5,
						}}
					>
						Already have an account? Please
						<Link style={{ fontWeight: 800 }} to="/login">
							Login
						</Link>
					</Typography>
				</StyledForm>
			</div>
		</>
	);
};

export default Register;
