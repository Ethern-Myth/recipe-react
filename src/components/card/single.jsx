import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as link } from "react-router-dom";
import { Row } from "react-bootstrap";
import ReactMarkDown from "react-markdown";

function RecipeCard({ data, api_url }) {
	return (
		<>
			<Row className="w-100 ml-auto justify-content-end mb-4">
				<Link
					as={link}
					to="/"
					className="btn btn-primary text-decoration-none"
					style={{ maxWidth: 100 }}
				>
					Back
				</Link>
			</Row>
			<Card className="justify-content-center" sx={{ maxWidth: "auto" }}>
				<CardMedia
					component="img"
					height="500"
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
					<Typography paragraph>Instructions:</Typography>
					<ReactMarkDown>{data.instructions}</ReactMarkDown>
				</CardContent>
				<CardActions>
					<Button size="small" href={data.link}>
						Video Link
					</Button>
				</CardActions>
			</Card>
		</>
	);
}

export default RecipeCard;
