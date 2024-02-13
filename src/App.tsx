import MainLayout from "./components/Layouts/MainLayout";
import ProtectedRoutes from "./components/Layouts/ProtectedRoute";
function App() {
	return (
		<>
			<ProtectedRoutes>
				<MainLayout />
			</ProtectedRoutes>
		</>
	);
}
export default App;
