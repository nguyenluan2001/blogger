import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AuthenticationLayout from "../components/layouts/AuthenticationLayout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../utils/validation";
import * as yup from "yup";
import { register } from "../api/authentication/register";
import { useRouter } from "next/router";
import { useSnackBarHook } from "hooks/useSnackBarHook";

const Register = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullname: "",
            email: "",
            username: "",
            password: "",
            confirm_password: null
        },
        resolver: yupResolver(registerSchema)
    });
    const router = useRouter();
    const {openSnackError} = useSnackBarHook();
    const onSubmit = async (values) => {
       try {
        console.log(values);
        console.log("errors", errors)
        register(values)
        router.push("/login");
       } catch (error) {
            openSnackError({title: error?.message})
       }
    }
    console.log("process.env.STRAPI_URL", process.env.NEXT_PUBLIC_STRAPI_URL)
    return (
        <Box>
            <Typography variant="h4" textAlign="center" mb={3}>Register new account</Typography>
            <Box mb={2}>
                {process.env.STRAPI_URL}
                <Controller
                    control={control}
                    name="fullname"
                    render={({ field }) => (
                        <TextField
                            variant="outlined"
                            placeholder="Fullname"
                            fullWidth
                            {...field}
                            helperText={errors?.fullname?.message}
                            error={errors?.fullname && errors?.fullname}>
                        </TextField>
                    )}
                >
                </Controller>
            </Box>
            <Stack direction="row" spacing={2} mb={2}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <TextField
                            variant="outlined"
                            placeholder="Email"
                            sx={{ width: "50%" }}
                            {...field}
                            helperText={errors?.email?.message}
                            error={errors?.email && errors?.email}>
                        ></TextField>
                    )}
                ></Controller>
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <TextField
                            variant="outlined"
                            placeholder="Username"
                            sx={{ width: "50%" }}
                            {...field}
                            helperText={errors?.username?.message}
                            error={errors?.username && errors?.username}>
                        ></TextField>
                    )}
                ></Controller>
            </Stack>
            <Box mb={2}>
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <TextField
                            type="password"
                            variant="outlined"
                            placeholder="Password"
                            fullWidth
                            {...field}
                            helperText={errors?.password?.message}
                            error={errors?.password && errors?.password}>
                        ></TextField>
                    )}
                >
                </Controller>
            </Box>
            <Box mb={2}>
                <Controller
                    control={control}
                    name="confirm_password"
                    render={({ field }) => (
                        <TextField
                            type="password"
                            variant="outlined"
                            placeholder="Confirm Password"
                            fullWidth
                            {...field}
                            helperText={errors?.confirm_password?.message}
                            error={errors?.confirm_password && errors?.confirm_password}>
                        ></TextField>
                    )}
                >
                </Controller>
            </Box>
            <Stack direction="row" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Register</Button>
            </Stack>
        </Box >
    )
}
Register.getLayout = function getLayout(page) {
    return <AuthenticationLayout>{page}</AuthenticationLayout>
}
export const getServerSideProps = () => {
    console.log("process.env.STRAPI_URL", process.env.NEXT_PUBLIC_STRAPI_URL)
    console.log("test", process.env.NEXT_PUBLIC_TEST)
    return {
        props: {}
    }
}
export default Register;