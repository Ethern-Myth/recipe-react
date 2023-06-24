import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import RecipeCard from "@components/card/single";

// API IMPORTS
import recipe from "@controllers/recipe.controller";

function Recipe({ api_url }) {
	const { id } = useParams();
	const { data, isLoading } = useQuery(["recipe", { id }], recipe.byId);

	if (isLoading) return "Loading...";
	if (!data) return "No recipe found.";

	return <RecipeCard data={data} api_url={api_url} />;
}

export default Recipe;
