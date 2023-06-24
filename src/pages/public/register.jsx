import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import home from "@controllers/home.controller";

const theme = createTheme();

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
                Recipe App
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Register() {
    const navigate = useNavigate();

    //Mutate Register
    const { mutate: register } = useMutation(home.register, {
        onSuccess: (res) => {
            if (res && res._id.length > 0) {
                toast("Successfully Registered", {
                    type: "success",
                });
                navigate("/login");
            } else {
                toast("User already registered", {
                    type: "info",
                });
            }
        },
        onError: () => {
            toast("Registration Failed", {
                type: "error",
            });
        },
    });

    const { values, errors, submitForm, handleChange } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Required"),
            email: yup.string().email("Invalid email format").required("Required"),
            password: yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            register(values);
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    size="small"
                                    label="Name"
                                    autoFocus
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    size="small"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    size="small"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={submitForm}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
export default Register;
