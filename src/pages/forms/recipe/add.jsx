import { useEffect, useLayoutEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "@lib/authorize";
import { MuiChipsInput } from "mui-chips-input";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// API IMPORTS
import recipe from "@controllers/recipe.controller";

function RecipeForm({ api_url }) {
	const queryClient = useQueryClient();
	const auth = useAuth();
	const userId = auth.getId();
	const navigate = useNavigate();
	const [ingredients, setIngredients] = useState([]);
	const [image, setImage] = useState("");

	const { id } = useParams();
	const { data, isLoading } = useQuery(["recipe", { id }], recipe.byId);

	//Mutate Add Recipe
	const { mutate: add } = useMutation(recipe.add, {
		onSuccess: (res) => {
			queryClient.invalidateQueries();
			if (res) {
				toast("Added Successfully", { type: "success" });
			} else {
				toast("Adding Recipe Failed", { type: "error" });
			}
			navigate("/dashboard");
		},
		onError: () => {
			toast("Failed to create recipe", {
				type: "error",
			});
		},
	});

	//Mutate Update Recipe
	const { mutate: update } = useMutation(recipe.update, {
		onSuccess: (res) => {
			queryClient.invalidateQueries();
			if (res._id) {
				toast("Updated Successfully", { type: "success" });
			} else {
				toast("Updating Recipe Failed", { type: "error" });
			}
			navigate("/dashboard");
		},
		onError: () => {
			toast("Failed to create recipe", {
				type: "error",
			});
		},
	});

	const handleInputChange = (value) => {
		setIngredients(value);
	};

	const handleImageChange = (value) => {
		setImage(value);
		values.image ? document.getElementById("uploaded").src = values.image : "";
	}

	const { values, errors, submitForm, handleChange } = useFormik({
		initialValues: {
			description: data ? data.description : "",
			ingredients: data ? data.ingredients : [],
			instructions: data ? data.instructions : "",
			image: data ? api_url + "/" + data.image : "",
			link: data ? data.link : "",
			userId: userId,
			_id: !isLoading ?? data._id,
		},
		validationSchema: yup.object({
			description: yup.string().required("Required"),
			ingredients: yup.array().required("Required"),
			instructions: yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			if (data) {
				delete values.userId;
				update(values);
			} else {
				add(values);
			}
		},
	});

	useLayoutEffect(() => {
		if (isLoading && !data) "Please wait ... Loading";
	}, [isLoading, data]);

	useEffect(() => {
		if (data) {
			setIngredients(data.ingredients);
		}
	}, [data]);

	useEffect(() => {
		if (data) {
			setImage(api_url + "/" + data.image);
		}
	}, [data, api_url])

	useEffect(() => {
		values.ingredients = ingredients;
		values.image = image;
		if (!isLoading && data) {
			values.description = data.description;
			values.instructions = data.instructions;
			values.link = data.link;
			values._id = data._id;
		}
	}, [data, isLoading, values, ingredients, image]);


	return (
		<Grid container rowGap={2}>
			{data && (<Grid item xs={12}>
				<img src={image} name="uploaded" id="uploaded" height={100} width={100} alt="image" />
			</Grid>)
			}

			<Grid item xs={12}>
				<TextField
					autoFocus
					margin="dense"
					id="description"
					name="description"
					label="Description"
					type="name"
					fullWidth
					size="small"
					error={!!errors.description}
					helperText={errors.description}
					value={values.description}
					onChange={handleChange}
				/>
			</Grid>

			<Grid item xs={12}>
				<MuiChipsInput
					margin="dense"
					id="ingredients"
					name="ingredients"
					label="Ingredients"
					fullWidth
					size="small"
					value={ingredients}
					onChange={handleInputChange}
				/>
			</Grid>

			<Grid item xs={12}>
				<label className="form-label">Instructions</label>
				<textarea
					className="form-control"
					id="instructions"
					name="instructions"
					label="Instructions"
					rows="4"
					size="small"
					value={values.instructions}
					onChange={handleChange}
					required
				></textarea>
			</Grid>

			<Grid item xs={12}>
				<TextField
					margin="dense"
					id="link"
					name="link"
					label="Video Link"
					fullWidth
					size="small"
					error={!!errors.link}
					helperText={errors.link}
					value={values.link}
					onChange={handleChange}
				/>
			</Grid>

			{
				!data && (<Grid item xs={12}>
					<label className="form-label" htmlFor="formFile">
						Choose image
					</label>
					<input
						className="form-control"
						type="file"
						accept="image/*"
						id="image"
						name="image"
						onChange={(e) => handleImageChange(e.target.files[0])}
						required
					/>
				</Grid>)
			}

			<Grid item xs={12}>
				<ButtonGroup
					variant="spaced"
					aria-label="outlined primary button group"
				>
					<Button
						sx={{ color: "white" }}
						variant="contained"
						onClick={submitForm}
					>
						Save
					</Button>
					<Button
						sx={{
							backgroundColor: "#ededed",
							color: "grey",
							border: "#BEBEBE",
						}}
						onClick={() => {
							navigate("/dashboard")
						}}
					>
						Cancel
					</Button>
				</ButtonGroup>
			</Grid>
		</Grid >
	);
}

export default RecipeForm;
