import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { editUser } from "api/user/edit_user";
import AccountSettingLayout from "components/layouts/AccountSettingLayout";
import { userCurrentUser } from "hooks/useCurrentUser";
import { useSnackBarHook } from "hooks/useSnackBarHook";
import { Controller, useForm } from "react-hook-form";
import { changePasswordSchema } from "utils/validation";

const Password = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_password: ''
        },
        resolver: yupResolver(changePasswordSchema)
    })
    const { data: currUser } = userCurrentUser();
    const { openSnackSuccess, openSnackError } = useSnackBarHook();
    const onSubmit = async (values) => {
        console.log(values)
        console.log("errors", errors);
        try {
            await editUser({
                user_id: currUser?.id,
                data: {
                    password: values.new_password
                }
            })
            openSnackSuccess({ title: "Change password successfully" })
        } catch (error) {
            openSnackError({ title: error.message })
        }
    }
    return (
        <Box p={3}>
            <Typography variant="h5">Change password</Typography>
            <Typography>
                Change password to your account. You should set the password to get the left access to your account
            </Typography>
            <Stack direction="column" spacing={2} >
                <Box mt={3}>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography>Current password</Typography>
                    </Stack>
                    <Controller
                        name="current_password"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} type="password" fullWidth error={errors?.current_password} helperText={errors?.current_password && errors?.current_password?.message}></TextField>
                        )}
                    ></Controller>
                </Box>
                <Box>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography>New password</Typography>
                    </Stack>
                    <Controller
                        name="new_password"
                        control={control}
                        render={({ field }) => <TextField {...field} type="password" fullWidth error={errors?.new_password} helperText={errors?.new_password && errors?.new_password?.message}></TextField>}
                    ></Controller>
                </Box>
                <Box>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography>Confirm password</Typography>
                    </Stack>
                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field }) => <TextField {...field} type="password" fullWidth error={errors?.confirm_password} helperText={errors?.confirm_password && errors?.confirm_password?.message}></TextField>}
                    ></Controller>
                </Box>
            </Stack>
            <Stack direction="row" spacing={2}
                sx={{
                    marginLeft: 'auto',
                    mt: 2
                }}
            >
                <Button onClick={() => reset()}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Change password</Button>
            </Stack>
        </Box>
    )
}
Password.getLayout = function getLayout(page) {
    return <AccountSettingLayout>{page}</AccountSettingLayout>
}
export default Password;