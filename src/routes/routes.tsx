/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddEyeGlassForm from "../components/UI/AddEyeGlassForm";
import AllGlasses from "../pages/AllGlasses/AllGlasses";
import Loggin from "../pages/Login/Loggin";
import Register from "../pages/Register/Regisster";
import UserDashboard from "../pages/user/UserDashboard";
import SaleHistory from "../pages/SaleHistory/SaleHistory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "add-product",
				element: <AddEyeGlassForm />,
			},
			{
				path: "eyeglasses-list",
				element: <AllGlasses />,
			},

			{
				index: true,
				element: <UserDashboard />,
			},
			{
				path: "dashboard",
				element: <UserDashboard />,
			},
			{
				path: "sales-history",
				index: true,
				element: <SaleHistory />,
			},
		],
	},

	{
		path: "/login",
		element: <Loggin />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

export default router;
