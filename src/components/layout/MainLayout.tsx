import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
	return (
		<div className="flex">
			<div className="lg:w-1/6 w-2 z-50 overflow-hidden">
				<Sidebar />
			</div>
			<div className="px-3 py-5 lg:w-[84%] lg:overflow-hidden mx-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
