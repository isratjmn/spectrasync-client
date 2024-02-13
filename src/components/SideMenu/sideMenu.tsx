// import { AppstoreOutlined, ShopOutlined } from "@ant-design/icons";
// import { Menu } from "antd";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// interface MenuItem {
// 	label: string;
// 	key: string;
// 	icon: JSX.Element;
// }
// function SideMenu() {
// 	const location = useLocation();
// 	const [selectedKeys, setSelectedKeys] = useState<string>("/");
// 	useEffect(() => {
// 		const pathName = location.pathname;
// 		setSelectedKeys(pathName);
// 	}, [location.pathname]);
// 	const navigate = useNavigate();
// 	const menuItems: MenuItem[] = [
// 		{
// 			label: "Dashboard",
// 			key: "/",
// 			icon: <AppstoreOutlined />,
// 		},
// 		{
// 			label: "Eye Glass",
// 			key: "/product-list",
// 			icon: <ShopOutlined />,
// 		},
// 		{
// 			label: "Eye Glass List",
// 			key: "/sale-list",
// 			icon: <ShopOutlined />,
// 		},
// 	];

// 	return (
// 		<div className="SideMenu">
// 			<Menu
// 				className="SideMenuVertical"
// 				mode="vertical"
// 				/* style={{
// 					height: "120vh",
// 					position: "sticky",
// 					top: "0",

// 				}} */
// 				onClick={(item) => {
// 					navigate(item.key);
// 				}}
// 				selectedKeys={[selectedKeys]}
// 			>
// 				{menuItems.map((item) => (
// 					<Menu.Item key={item.key} icon={item.icon}>
// 						{item.label}
// 					</Menu.Item>
// 				))}
// 			</Menu>
// 		</div>
// 	);
// }

// export default SideMenu;
import { AppstoreOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
	label: string;
	key: string;
	icon: JSX.Element;
}

function SideMenu() {
	const location = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string>("/");
	useEffect(() => {
		const pathName = location.pathname;
		setSelectedKeys(pathName);
	}, [location.pathname]);

	const navigate = useNavigate();

	const menuItems: MenuItem[] = [
		{
			label: "Dashboard",
			key: "/",
			icon: <AppstoreOutlined />,
		},
		{
			label: "Eye Glass",
			key: "/product-list",
			icon: <ShopOutlined />,
		},
		{
			label: "Eye Glass List",
			key: "/sale-list",
			icon: <ShopOutlined />,
		},
	];

	return (
		<div className="SideMenu">
			<Menu
				className="SideMenuVertical"
				mode="vertical"
				onClick={(item) => {
					navigate(item.key);
				}}
				selectedKeys={[selectedKeys]}
			>
				{menuItems.map((item, index) => (
					<React.Fragment key={item.key}>
						{index === 1 && <Menu.Divider />}
						<Menu.Item key={item.key} icon={item.icon}>
							{item.label}
						</Menu.Item>
					</React.Fragment>
				))}
			</Menu>
		</div>
	);
}

export default SideMenu;
