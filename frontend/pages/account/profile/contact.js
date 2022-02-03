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
import { useUniversities } from "hooks/useUniversities";
const Personal = () => {
    const { data: currUser, isLoading } = userCurrentUser();
    const { control, handleSubmit, getValues, setValue, watch } = useForm({
        defaultValues: {
            real_name: '',
            phone: '',
            address: '',
            school: ''
        }
    })
    const {data: universities} = useUniversities();
    const { openSnackSuccess, openSnackError } = useSnackBarHook();
    useEffect(() => {
        if (currUser) {
            setValue('real_name', currUser?.real_name)
            setValue('phone', currUser?.phone)
            setValue('address', currUser?.address)
            setValue('school', currUser?.university)
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
                data: {...values, university: values.school.id}
            })
            openSnackSuccess({ title: 'Your personal information was updated successfully' })
        } catch (error) {
            openSnackError({ title: error.message })
        }
    }
    return (
        <Stack direction="column" spacing={2} p={3}>
            <Typography variant="h5">Contact Information</Typography>
            <Typography variant="subtitle1">Manage your contact information</Typography>
            <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography>Real name</Typography>
                    </Stack>
                    <Controller
                        control={control}
                        name="real_name"
                        render={({ field }) => <TextField {...field} value={getValues('real_name')} fullWidth></TextField>}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ color: 'red' }}>*</Typography>
                        <Typography>Phone</Typography>
                    </Stack>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => <TextField {...field} value={getValues('phone')} fullWidth></TextField>}
                    >
                    </Controller>
                </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                    <Typography>Address</Typography>
                    <Controller
                        control={control}
                        name="address"
                        render={({ field }) => <TextField {...field} value={getValues('address')} fullWidth></TextField>}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography>School</Typography>
                    { universities && watch('school') && <Controller
                        control={control}
                        name="school"
                        render={({ field }) => (
                            <Autocomplete   
                                disablePortal
                                id="combo-box-demo"
                                options={universities}
                                getOptionLabel={option => option.name}
                                defaultValue={getValues("school")}
                                onChange={(event, value) => field.onChange(value)}
                                fullWidth
                                renderInput={(params) => <TextField {...params} />}
                            />
                        )}
                    >
                    </Controller>}
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