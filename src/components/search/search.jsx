import { useState, useMemo } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import DashboardCard from "@components/card/dashboard/index";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SearchDashboard({ recipes, api_url }) {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const filteredRecipes = useMemo(() => {
		if (recipes) {
			return recipes.filter((recipe) => {
				return (
					(keyword === "" ||
						recipe.description.toLowerCase().includes(keyword.toLowerCase())) &&
					(recipe.ingredients.length === 0 ||
						recipe.ingredients.filter((ingredient) => (ingredient.toLowerCase().includes(keyword.toLowerCase())))
					)
				);
			});
		}
	}, [keyword, recipes]);

	return (
		<>
			<Stack direction="horizontal" gap={4} className="mb-4">
				<Col>
					<Row>
						<Form.Group controlId="keyword">
							<Form.Control
								type="text"
								value={keyword}
								placeholder="Search recipe here ..."
								onChange={(e) => setKeyword(e.target.value)}
							/>
						</Form.Group>
					</Row>
				</Col>
			</Stack>

			<Row className="w-100 ml-auto justify-content-end mb-4">
				<Button
					size="small"
					variant="contained"
					onClick={() => {
						navigate("/dashboard/recipe")
					}}
					style={{ maxWidth: 100 }}
				>
					Add
				</Button>
			</Row>

			{recipes && filteredRecipes.map((recipe) =>
				<DashboardCard
					data={recipe}
					key={recipe._id}
					api_url={api_url}
				/>
			)}
		</>
	)
}

export default SearchDashboard;