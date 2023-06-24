import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@lib/authorize";
import Layout from "@components/layouts/private/layout";

function PrivateRouting() {
	const auth = useAuth();
	const loggedIn = auth.getIsLoggedIn();
	return loggedIn === 'true' ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" />
	);
}

export default PrivateRouting;
