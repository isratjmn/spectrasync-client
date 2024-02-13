import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/Features/auth/authSlice";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
	const token = useAppSelector(useCurrentToken);
	if (!token) {
		return <Navigate to="/login" replace={true} />;
	}  
	return children;
};

export default ProtectedRoutes;
