import { Divider, Stack, Typography, Autocomplete, InputAdornment, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import MeLayout from "components/layouts/MeLayout";
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useListTags } from "hooks/useListTags";
import { Icon } from "@iconify/react";
import magnifyIcon from '@iconify/icons-mdi/magnify';
import PostItemManage from "components/post/postItemManage";
import { useListPosts } from "hooks/useListPosts";
import { POST_STATUS_ENUM } from "utils/constances";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { filterPosts } from "api/post/filter_posts";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterSchema } from "utils/validation";
import { useSnackBarHook } from "hooks/useSnackBarHook";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "redux/slices/postManagement";
const FilterPost = ({ tags, control, getValues, onFilter, handleSubmit, onError }) => {
    return (
        <Stack direction="column" spacing={2} mt={3}>
            <Stack direction="row" spacing={2}>
                <Controller
                    control={control}
                    name="duration"
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Begin date"
                                value={getValues("duration.startDate")}
                                onChange={(newValue) => {
                                    // setValue(newValue);
                                    // let newDuration = {...field.value.duration}
                                    let newDuration = Object.assign({}, getValues("duration"))
                                    newDuration.startDate = newValue;
                                    field.onChange(newDuration)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    )}
                ></Controller>
                <Controller
                    control={control}
                    name="duration"
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="End date"
                                value={getValues("duration.endDate")}
                                onChange={(newValue) => {
                                    // setValue(newValue);
                                    // let newDuration = {...field.value.duration}
                                    let newDuration = Object.assign({}, getValues("duration"))
                                    console.log("newDuration", newDuration)

                                    newDuration.endDate = newValue;
                                    field.onChange(newDuration)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    )}
                ></Controller>

                <Controller
                    control={control}
                    name="tag"
                    render={({ field }) => (
                        <Autocomplete
                            sx={{ flex: 1 }}
                            options={tags}
                            getOptionLabel={(opion) => opion.name}
                            onChange={(e, value) => field.onChange(value)}
                            renderInput={(params) => <TextField variant="outlined" {...params} placeholder="Tag"></TextField>}
                        ></Autocomplete>
                    )}
                ></Controller>
            </Stack>
            <Controller
                control={control}
                name="keyword"
                render={({ field }) => (
                    <TextField
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton>
                                    <Icon icon={magnifyIcon}></Icon>
                                </IconButton>
                            </InputAdornment>,
                        }}
                        placeholder="Search"
                        fullWidth
                        {...field}
                    ></TextField>
                )}
            ></Controller>
            <Button variant="contained" color="primary" onClick={handleSubmit(onFilter, onError)}>Filter</Button>
        </Stack>
    )
}
export default FilterPost;