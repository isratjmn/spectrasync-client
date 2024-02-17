/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";

import React from "react";
import {
	IconButton,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	Input,
	Drawer,
	Card,
} from "@material-tailwind/react";
import { RiAddBoxLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
	MagnifyingGlassIcon,
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsEyeglasses } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { GiGooeyEyedSun } from "react-icons/gi";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const Sidebar = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		const toastId = toast.loading("loading...");
		dispatch(logout());
		toast.success("Logged out", { id: toastId, duration: 2000 });
	};

	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	return (
		<div className="fixed">
			<div className="hidden lg:block">
				<Card
					placeholder="..."
					color="transparent"
					shadow={false}
					className="h-[calc(100vh)] mb-0 w-full p-6 bg-gray-800 rounded-none"
				>
					<div className="mb-4 flex items-center gap-4 p-4 align-middle">
						<GiGooeyEyedSun className="h-8 w-8 text-white" />
						<Typography
							placeholder="..."
							variant="h5"
							className="text-2xl text-white"
						>
							SpectraSync
						</Typography>
					</div>
					<div className="p-2">
						<Input
							className="text-white border-3 border-white px-4 py-2 focus:outline-none focus:border-white text-2xl"
							crossOrigin="..."
							icon={
								<MagnifyingGlassIcon className="h-6 w-6 text-gray-900" />
							}
							label="Search"
							success
						/>
					</div>
					<List placeholder="...">
						<List placeholder="..." className="p-0">
							<NavLink to="/" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<MdOutlineDashboardCustomize className="h-6 w-6 text-gray-300" />
									</ListItemPrefix>
									Dashboard
								</ListItem>
							</NavLink>
							<NavLink to="/add-product" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<RiAddBoxLine className="h-6 w-6 text-gray-300" />
									</ListItemPrefix>
									Add Glasses
								</ListItem>
							</NavLink>
							<NavLink to="/all-products" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<BsEyeglasses className="h-7 w-7 font-extrabold text-gray-300" />
									</ListItemPrefix>
									Eye Glasses List
								</ListItem>
							</NavLink>
							<NavLink to="/sales-history" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<FaChartLine
											strokeWidth={3}
											className="h-6 w-6 text-gray-300"
										/>
									</ListItemPrefix>
									Sales History
								</ListItem>
							</NavLink>
						</List>

						<hr className="my-2 border-gray-300" />

						<ListItem onClick={handleLogout} placeholder="...">
							<ListItemPrefix placeholder="...">
								<RiLogoutBoxRLine className="h-6 w-6 text-gray-300" />
							</ListItemPrefix>

							<Link to="/login" className="text-white">
								Log Out
							</Link>
						</ListItem>
					</List>
				</Card>
			</div>
			<IconButton
				placeholder="..."
				variant="text"
				size="lg"
				onClick={openDrawer}
				className="lg:hidden"
			>
				{isDrawerOpen ? (
					<XMarkIcon className="h-8 w-8 stroke-2 text-gray-300" />
				) : (
					<Bars3Icon className="h-8 w-8 stroke-2 text-gray-300" />
				)}
			</IconButton>
			<Drawer
				placeholder="..."
				open={isDrawerOpen}
				onClose={closeDrawer}
				className="lg:hidden"
			>
				<Card
					placeholder="..."
					color="transparent"
					shadow={false}
					className="h-[calc(100vh-2rem)] w-full p-4 bg-gray-800 rounded-none"
				>
					<div className="mb-6 mt-4 flex items-center gap-4 p-4">
						<GiGooeyEyedSun className="h-10 w-10 text-white" />
						<Typography
							placeholder="..."
							variant="h5"
							color="white"
							className="text-3xl"
						>
							SpectraSync
						</Typography>
					</div>
					<div className="p-2">
						<Input
							className="text-white border-2 border-white px-4 py-2 focus:outline-none focus:border-white text-2xl"
							crossOrigin="..."
							icon={
								<MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
							}
							label="Search"
							success
						/>
					</div>
					<List placeholder="...">
						<List placeholder="..." className="p-0">
							<NavLink to="/" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<MdOutlineDashboardCustomize className="h-6 w-6 text-gray-300" />
									</ListItemPrefix>
									Dashboard
								</ListItem>
							</NavLink>
							<NavLink to="/add-product" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<RiAddBoxLine className="h-6 w-6 text-gray-300" />
									</ListItemPrefix>
									Add Glasses
								</ListItem>
							</NavLink>
							<NavLink to="/all-products" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<BsEyeglasses className="h-7 w-7 font-extrabold text-gray-300" />
									</ListItemPrefix>
									Eye Glasses List
								</ListItem>
							</NavLink>
							<NavLink to="/sales-history" className="text-white">
								<ListItem placeholder="...">
									<ListItemPrefix placeholder="...">
										<FaChartLine
											strokeWidth={3}
											className="h-6 w-6 text-gray-300"
										/>
									</ListItemPrefix>
									Sales History
								</ListItem>
							</NavLink>
						</List>

						<hr className="my-2 border-gray-300" />

						<ListItem onClick={handleLogout} placeholder="...">
							<ListItemPrefix placeholder="...">
								<RiLogoutBoxRLine className="h-6 w-6 text-gray-300" />
							</ListItemPrefix>

							<Link to="/login" className="text-white">
								Log Out
							</Link>
						</ListItem>
					</List>
				</Card>
			</Drawer>
		</div>
	);
};

export default Sidebar;
