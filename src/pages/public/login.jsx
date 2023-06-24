import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "@lib/authorize";
import { useNavigate } from "react-router-dom";

// API IMPORTS
import home from "@controllers/home.controller";

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

const theme = createTheme();

function Login() {
    const auth = useAuth();
    const navigate = useNavigate();

    //Mutate Login User
    const { mutate: login } = useMutation(home.login, {
        onSuccess: (res) => {
            if (res === undefined) {
                auth.logout();
                return toast("Invalid Login", {
                    type: "error",
                });
            }
            auth.setIsLoggedIn(true);
            auth.setId(res.id);
            auth.setUser([res.name, res.email]);
            auth.setToken(res.token);
            navigate("/dashboard");
        },
    });

    const { values, errors, submitForm, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object().shape({
            email: yup.string().email("Invalid email format").required("Required"),
            password: yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            login(values);
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
                        Sign in
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            size="small"
                            error={!!errors.email}
                            helperText={errors.email}
                            value={values.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            size="small"
                            error={!!errors.password}
                            helperText={errors.password}
                            value={values.password}
                            onChange={handleChange}
                        />
                        <Button
                            onClick={submitForm}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}


export default Login;