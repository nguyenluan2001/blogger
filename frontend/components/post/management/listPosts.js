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
const ListPosts = ({ posts, icon, status }) => {
    console.log("")
    return (
        <Box mt={4}>
            {
                posts?.map((post) => {
                    return <PostItemManage post={post} icon={icon} status={status}></PostItemManage>
                })
            }
        </Box>
    )
}
export default ListPosts;