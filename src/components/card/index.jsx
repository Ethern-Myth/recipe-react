import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkDown from "react-markdown";
import Link from "@mui/material/Link";
import { Link as link } from "react-router-dom";
import dayjs from "dayjs";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

function RecipeReviewCard({ recipe, api_url }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: "auto", marginBottom: 5, alignItems: "center" }}>
			<Link
				as={link}
				to={`/${recipe._id}`}
				className={`h-100 text-reset text-decoration-none`}
			>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="user">
							{recipe.userId.name[0]}
						</Avatar>
					}
					title={recipe.description}
					subheader={dayjs(recipe.createdAt).format("DD/MMM/YYYY")}
				/>
			</Link>
			<Link
				as={link}
				to={`/${recipe._id}`}
				className={`h-100 text-reset text-decoration-none`}
			>
				<CardMedia
					component="img"
					height="200"
					image={api_url + "/" + recipe.image}
					alt="image"
					loading="lazy"
				/>
			</Link>
			<CardContent>
				<Typography paragraph>Ingredients:</Typography>
				<Typography variant="body2" color="text.secondary">
					{recipe.ingredients + " "}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Instructions:</Typography>
					<ReactMarkDown>{recipe.instructions}</ReactMarkDown>
					<Typography paragraph>Video Link:</Typography>
					<Link href={recipe.link}>Click here</Link>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default RecipeReviewCard;
