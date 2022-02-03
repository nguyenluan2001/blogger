import { Autocomplete, Button, Input, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccountSettingLayout from "components/layouts/AccountSettingLayout";
import { Controller, useForm } from "react-hook-form";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { userCurrentUser } from "hooks/useCurrentUser";
import { useEffect } from "react";
import { editUser } from "api/user/edit_user";
import { useSnackBarHook } from "hooks/useSnackBarHook";

const Personal = () => {
    const { data: currUser, isLoading } = userCurrentUser();
    const { control, handleSubmit, getValues, setValue, watch } = useForm({
        defaultValues: {
            username: '',
            fullname: '',
            birthday: moment(),
            gender: ''
        }
    })
    const { openSnackSuccess, openSnackError } = useSnackBarHook();
    useEffect(() => {
        if (currUser) {
            setValue('username', currUser?.username)
            setValue('fullname', currUser?.fullname)
            setValue('birthday', currUser?.birthday)
            setValue('gender', currUser?.gender)
        }
    }, [currUser])
    const handleChooseAvatar = (e) => {
        console.log(e.target.files[0])
    }
    const onSubmit = async (values) => {
        console.log("values", values)
        try {
            await editUser({
                user_id: currUser?.id,
                data: values
            })
            openSnackSuccess({ title: 'Your personal information was updated successfully' })
        } catch (error) {
            openSnackError({ title: error.message })
        }
    }
    return (
        <Stack direction="column" spacing={2} p={3}>
            <Typography variant="h5">Personal Information</Typography>
            <Typography variant="subtitle1">Manage your information</Typography>
            <Stack
                direction="row"
                justifyContent="center"
            >
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => <input type="file" id="avatar" hidden onChange={(e) => handleChooseAvatar(e)}></input>}
                ></Controller>
                <label
                    for="avatar"
                    style={{
                        height: '100px',
                        width: '100px',
                        borderRadius: '50%',
                        display: 'block',
                        overflow: 'hidden'
                    }}>
                    <img src="/static/avatar/avatar_1.jpg" style={{ width: '100%' }}></img>
                </label>
            </Stack>
            <Box>
                <Typography>Username</Typography>
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => <TextField {...field} value={getValues('username')} fullWidth disabled variant="filled"></TextField>}
                />
            </Box>
            <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: 'red' }}>*</Typography>
                    <Typography>Fullname</Typography>
                </Stack>
                <Controller
                    control={control}
                    name="fullname"
                    render={({ field }) => <TextField {...field} value={getValues('fullname')} fullWidth></TextField>}
                >
                </Controller>
            </Box>
            <Stack direction="row" spacing={2}>
                <Box
                    sx={{ flex: 1 }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography variant="subtitle1">Birthday</Typography>
                    </Stack>
                    <Controller
                        control={control}
                        name="birthday"
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    value={getValues("birthday")}
                                    onChange={(newValue) => {
                                        // setValue(newValue);
                                        // setValue("birthday", value)
                                        field.onChange(newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        )}
                    ></Controller>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography variant="subtitle1">Gender</Typography>
                    </Stack>
                    {watch('gender') && <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => (
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['MALE', 'FEMALE', 'OTHER']}
                                defaultValue={getValues('gender')}
                                // getOptionLabel={(option) => option.toCa}
                                fullWidth
                                onChange={(event, value) => field.onChange(value)}
                                renderInput={(params) => <TextField {...params} fullWidth placeholder="Choose" />}
                            />
                        )}
                    ></Controller>}
                </Box>
            </Stack>
            <Stack direction="row" spacing={2}
                sx={{
                    width: 'fit-content',
                    marginLeft: 'auto'
                }}
            >
                <Button>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Update</Button>
            </Stack>
        </Stack>
    )
}
Personal.getLayout = function getLayout(page) {
    return <AccountSettingLayout>{page}</AccountSettingLayout>
}
export default Personal;