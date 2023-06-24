import { useAuth } from "@lib/authorize";
import { useQuery } from "react-query";
import SearchDashboard from "@components/search/search";

// API IMPORTS
import user from "@controllers/user.controller";

function Dashboard({ api_url }) {
	const auth = useAuth();
	const id = auth.getId();
	const { data: recipes, isLoading } = useQuery(["recipe", { id }], user.all);
	if (isLoading) return "Loading...";
	if (!recipes) return "No recipe found.";
	return <SearchDashboard recipes={recipes} api_url={api_url} />;
}

export default Dashboard;
