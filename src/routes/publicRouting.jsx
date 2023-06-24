import Layout from "@components/layouts/public/layout";
import { Outlet } from "react-router-dom";

function PublicRouting() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export default PublicRouting;
