import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PublicRouting from "@routes/publicRouting";
import PrivateRouting from "@routes/privateRouting";
import { useQuery } from "react-query";
// PAGES import
import Login from "@pages/public/login";
import Home from "@pages/public/index";
import Error from "@pages/public/error";
import Register from "@pages/public/register";
import Dashboard from "@pages/dashboard/dashboard";
import Recipe from "@pages/public/recipe/index";
import RecipeForm from "@pages/forms/recipe/add";

// API IMPORTS
import recipe from "@controllers/recipe.controller";

// STYLES IMPORTS
import "@styles/App.css";


function App() {
	const { data: recipes, isLoading } = useQuery(["recipes"], recipe.all);
	const API_URL = process.env.NODE_ENV === "development"
		? import.meta.env.VITE_API_URL_DEV
		: import.meta.env.VITE_API_URL_PROD;

	if (isLoading) return "Loading...";
	if (!recipe) return "No data to show. Oops ...";

	return (
		<Container className="my-4">
			<Routes>
				<Route element={<PublicRouting />}>
					<Route path="/" element={<Home recipes={recipes} isLoading={isLoading} api_url={API_URL} />} />
					<Route path="/:id" element={<Recipe api_url={API_URL} />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route element={<PrivateRouting />}>
					<Route path="/dashboard" element={<Dashboard api_url={API_URL} />} />
					<Route path="/dashboard/recipe/:id?" element={<RecipeForm api_url={API_URL} />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</Container>
	);
}

export default App;
