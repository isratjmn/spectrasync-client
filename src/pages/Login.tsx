import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const [userLogin] = useLoginMutation();
	const dispatch = useAppDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Logging in...");
		const userInfo = {
			email: data.email,
			password: data.password,
		};
		const res = await userLogin(userInfo).unwrap();
		const user = verifyToken(res.data.accessToken) as TUser;
		dispatch(setUser({ user, token: res.data.accessToken }));
		toast.success("Logged in", { id: toastId, duration: 2000 });
		navigate(`/`);
	};

	return (
		<div className="bg-indigo-100 dark:bg-cyan-100 h-screen overflow-hidden flex items-center justify-center">
			<div className="bg-indigo-200 lg:w-5/12 md:6/12 w-10/12 shadow-3xl rounded-xl">
				<div className="mt-6">
					<h1 className="text-2xl pt-8 text-center font-extrabold">
						Login to{" "}
						<span className=" text-2xl font-black text-deep-purple-900">
							SpectraSync Eye GLasses
						</span>
					</h1>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="md:p-20">
					<div className="flex items-center text-lg mb-6 md:mb-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 absolute ml-3"
						>
							<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
							<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
						</svg>

						<input
							{...register("email")}
							type="email"
							id="email"
							className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
							placeholder="Email"
						/>
					</div>
					{/* <div className="flex items-center text-lg mb-6 md:mb-8">
						<svg
							className="absolute ml-3"
							viewBox="0 0 24 24"
							width="24"
						>
							<path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
						</svg>

						<input
							{...register("password")}
							type="password"
							id="password"
							className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
							placeholder="Password"
						/>
					</div> */}
					<div className="flex items-center text-lg mb-6 md:mb-8 relative">
						<svg
							className="absolute ml-3 cursor-pointer"
							viewBox="0 0 24 24"
							width="24"
							onClick={() => setShowPassword(!showPassword)}
						>
							<path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
						</svg>

						<input
							{...register("password")}
							type={showPassword ? "text" : "password"}
							id="password"
							className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
							placeholder="Password"
						/>
					</div>
					<button className="bg-gradient-to-b from-deep-purple-800 to-purple-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
						Login
					</button>
					<div className="mt-4">
						<p className="text-center text-sm text-gray-600">
							Don&#x27;t have an account yet?
							<Link
								to="/register"
								className="font-semibold text-gray-800 hover:underline focus:text-gray-800 focus:outline-none ms-1 text-md"
							>
								Register
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
