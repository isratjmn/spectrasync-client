import { Link, NavLink, Outlet } from "react-router-dom";
import eye_logo from "./../../assets/eye_logo.png";
import { Layout, Menu, MenuProps, message } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/Features/auth/authSlice";
import {
	UserOutlined,
	LogoutOutlined,
	PlusOutlined,
	ShoppingOutlined,
	HistoryOutlined,
	UnorderedListOutlined,
	SettingOutlined,
} from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
const items: MenuProps["items"] = [
	{
		key: "Dashboard",
		label: <NavLink to="/dashboard">Dashboard</NavLink>,
		icon: <UserOutlined />,
		style: { marginTop: "22px" },
	},
	{
		key: "Glasses Management",
		label: "EyeGlass Details",
		children: [
			{
				key: "Add Glasses",
				label: (
					<NavLink
						to="/add-product"
					>
						Add Eye Glasses
					</NavLink>
				),
				icon: <PlusOutlined />,
			},
			{
				key: "EyeGlasses List",
				label: <NavLink to="/eyeglasses-list">Eye Glasses list</NavLink>,
				icon: <UnorderedListOutlined />,
			},
		],
		icon: <ShoppingOutlined />,
		style: { marginTop: "10px" },
	},
	{
		key: "SalesHistory",
		label: <NavLink to="/sales-history">Sale History</NavLink>,
		icon: <HistoryOutlined />,
		style: { marginTop: "16px" },
	},
	{
		key: "Settings",
		label: "Setting",
		icon: <SettingOutlined />,
		children: [
			{
				key: "Logout",
				label: <NavLink to="/login">Logout</NavLink>,
				icon: <LogoutOutlined />,
			},
			{
				key: "Register",
				label: <NavLink to="/register">Register</NavLink>,
				icon: <PlusOutlined />,
			},
		],
		style: { marginTop: "16px" },
	},
];

const MainLayout = () => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(logout());
		message.success("Logged Out Successfully!! Please Login!!");
	};
	return (
		<div>
			<Layout style={{ height: "150vh" }}>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							color: "white",
							textAlign: "center",
							justifyContent: "center",
							paddingTop: "15px",
						}}
					>
						<img
							src={eye_logo}
							alt="Eye Logo"
							style={{
								maxWidth: "50px",
								maxHeight: "50px",
								width: "auto",
								height: "auto",
							}}
						/>
						<h1 style={{ marginLeft: "10px" }}>SpectraSync</h1>
					</div>

					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["dashboard"]}
						items={items}
						style={{ fontSize: "15px" }}
					/>
				</Sider>
				<Layout>
					<Header style={{ paddingBottom: "20px" }}>
						<div style={{ float: "right", marginRight: "20px" }}>
							<Link to="/login" onClick={handleLogout}>
								<LogoutOutlined
									style={{ fontSize: "24px", color: "white" }}
								/>
							</Link>
						</div>
					</Header>
					<Content style={{ margin: "20px 14px 0" }}>
						<div style={{ padding: 20, minHeight: 360 }}>
							<Outlet />
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default MainLayout;
