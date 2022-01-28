import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AuthenticationLayout from "../components/layouts/AuthenticationLayout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../utils/validation";
import { strapi } from "../utils/strapi";
import {useRouter} from "next/router";
import Cookie from "js-cookie";
const Login = () => {
    const { control, handleSubmit, formState:{errors} } = useForm({
        defaultValues:{
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema)
    });
    const router = useRouter();
    const onSubmit = async(values) => {
        const {email, password} = values;
        const { user, jwt } = await strapi.login({
            identifier: email,
            password,
          });
        if(user, jwt) {
            Cookie.remove("token");
            Cookie.set("token", jwt);
            router.push("/news")
        }
    }
    console.log("process.env.STRAPI_URL", process.env.NEXT_PUBLIC_STRAPI_URL)
    return (
        <Box>
            <Typography variant="h4" textAlign="center" mb={3}>Login into Blogger</Typography>
            <Box mb={2}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <TextField 
                            variant="outlined" 
                            placeholder="Email" 
                            fullWidth 
                            {...field} 
                            helperText={errors?.email?.message} 
                            error={errors?.email && errors?.email}>
                        </TextField>
                    )}
                >
                </Controller>
            </Box>
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
            <Stack direction="row" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Login</Button>
            </Stack>
        </Box >
    )
}
Login.getLayout = function getLayout(page) {
    return <AuthenticationLayout>{page}</AuthenticationLayout>
}
export const getServerSideProps = () => {
    console.log("process.env.STRAPI_URL", process.env.NEXT_PUBLIC_STRAPI_URL)
    console.log("test", process.env.NEXT_PUBLIC_TEST)
    return {
        props:{}
    }
}
export default Login;