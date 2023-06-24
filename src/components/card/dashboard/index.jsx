import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// API IMPORTS
import recipe from "@controllers/recipe.controller";

function DashboardCard({ data, api_url }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: deleteRecipe } = useMutation(recipe.remove, {
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: () => {
			toast("Failed to create recipe", {
				type: "error",
			});
		},
	});

	return (
		<Card className="justify-content-center" sx={{ maxWidth: "auto", marginBottom: 5 }}>
			<CardMedia
				component="img"
				height="150"
				image={api_url + "/" + data.image}
				alt="image"
				loading="lazy"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{data.description}
				</Typography>
				<Typography paragraph>Ingredients:</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ marginBottom: 2 }}
				>
					{data.ingredients + " "}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					variant="contained"
					onClick={() => {
						navigate(`/dashboard/recipe/${data._id}`)
					}}
				>
					Update
				</Button>
				<Button
					size="small"
					variant="contained"
					sx={{
						backgroundColor: "red",
						color: "white",
					}}
					onClick={() => deleteRecipe(data._id)}
				>
					Delete
				</Button>
			</CardActions>
		</Card >
	);
}

export default DashboardCard;
