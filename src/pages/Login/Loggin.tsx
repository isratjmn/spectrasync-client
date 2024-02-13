import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, message } from "antd";
import "./Loggin.css";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// import { useLoginMutation } from "../redux/Features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/Features/auth/authApi";
import { tokenverify } from "../../utils/tokenVerify";
import { setUser } from "../../redux/Features/auth/authSlice";

// import { useAppDispatch } from "../redux/hooks";
// import { setUser } from "../redux/Features/auth/authSlice";
// import { tokenverify } from "../utils/tokenVerify";

interface FormData {
	email: string;
	password: string;
}
const StyledForm = styled.form`
	width: 100%;
	max-width: 450px;
	margin: 0 auto;
	text-align: left;
	padding: 8px;
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
	width: 30%;
`;

const Loggin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "olivia.jones@example.com",
			password: "hashed_password_here",
		},
	});
	const [login] = useLoginMutation();

	const onSubmit = async (data: FormData) => {
		try {
			const userInfo = {
				email: data.email,
				password: data.password,
			};
			const res = await login(userInfo).unwrap();
			const user = tokenverify(res.data.token);
			dispatch(
				setUser({
					user: user,
					token: res.data.token,
				})
			);
			message.success("Login Successfully");
			navigate("/");
		} catch (error) {
			console.error("Login Failed:", error);
			toast.error("Login Failed. Please try again later!!.");
		}
	};
	return (
		<>
			<div className="login-container">
				<div className="login-form">
					<Typography.Title
						style={{
							textAlign: "center",
							fontWeight: 700,
							fontSize: "30px",
							marginBottom: "30px",
							marginTop: "20px",
							color: "#000",
						}}
						level={4}
					>
						Please Login !!
					</Typography.Title>
					<StyledForm onSubmit={handleSubmit(onSubmit)}>
						<StyledLabel>
							Email:
							<StyledInput
								type="email"
								{...register("email", {
									required: "Please input your email!",
								})}
							/>
						</StyledLabel>
						<StyledLabel>
							Password:
							<StyledInput
								type="password"
								{...register("password", {
									required: "Please input your password!",
								})}
							/>
						</StyledLabel>
						<StyledButton type="primary" htmlType="submit">
							Login
						</StyledButton>
					</StyledForm>
					<Typography
						style={{ marginBottom: "20px", paddingTop: "10px" }}
					>
						Don't have an account?
						<span style={{ marginRight: "5px" }}></span>
						<Link style={{ fontWeight: 800 }} to="/register">
							Register
						</Link>
					</Typography>
				</div>
			</div>
		</>
	);
};

export default Loggin;
