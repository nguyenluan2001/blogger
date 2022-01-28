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
import earthIcon from '@iconify/icons-mdi/earth';

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
import FilterPost from "components/post/management/filterPost";
import ListPosts from "components/post/management/listPosts";

const useStyles = makeStyles({
    bigTitle: {
        display: 'flex',
        alignItems: 'center',
        '&::after': {
            content: "''",
            display: 'block',
            height: '2px',
            width: '100%',
            background: 'rgba(0,0,0,0.3)',
            marginLeft: 20
        }
    }
})
const PublicPost = () => {
    const classes = useStyles();
    const { data: tags, isLoadingTags } = useListTags();
    const { data: posts, isLoadingPosts } = useListPosts({
        query: {
            status: POST_STATUS_ENUM.PUBLIC
        }
    })
    const publicPosts = useSelector((state) => state.postManagement.publicPosts);
    console.log("publicPosts", publicPosts)
    const dispatch = useDispatch();
    const { control, handleSubmit, watch, getValues, formState: { errors } } = useForm({
        defaultValues: {
            duration: {
                startDate: moment(),
                endDate: moment()
            },
            tag: null,
            keyword: ''
        }, resolver: yupResolver(filterSchema)
    });
    const { openSnackError } = useSnackBarHook();
    useEffect(() => {
        if (posts) {
            dispatch(getPosts({status:POST_STATUS_ENUM.PUBLIC, posts}));

        }
    }, [posts])
    const onFilter = async () => {
        console.log("getValues", getValues());
        let filteredPosts = await filterPosts({
            query: {
                "created_at_gte": moment(getValues("duration.startDate")).toISOString(),
                "created_at_lte": moment(getValues("duration.endDate")).toISOString(),
                "tags": getValues("tag")?.id,
                "title_contains": getValues("keyword").toLowerCase(),
                "status": POST_STATUS_ENUM.PUBLIC
            }
        })
        console.log("filteredPosts", filteredPosts)
        dispatch(getPosts({status: POST_STATUS_ENUM.PUBLIC, posts: filteredPosts}));
    }
    const onError = () => {
        console.log("error", errors)
        if (errors?.duration) {
            openSnackError({ title: errors?.duration?.endDate?.message })
        }
        if (errors?.tags) {
            openSnackError({ title: errors?.tags?.message })
        }
        if (errors?.keyword) {
            openSnackError({ title: errors?.keyword?.message })
        }
    }
    return (
        <Box sx={{ flex: 1 }} pl={2}>
            <Box className={classes.bigTitle}>
                <Typography variant="h5">Draft</Typography>
            </Box>
            <FilterPost
                tags={tags}
                control={control}
                getValues={getValues}
                onFilter={onFilter}
                onError={onError}
                handleSubmit={handleSubmit}
            ></FilterPost>
            <ListPosts posts={publicPosts} icon={earthIcon}></ListPosts>
        </Box>
    )
}
PublicPost.getLayout = function getLayout(page) {
    return <MeLayout>{page}</MeLayout>
}
export default PublicPost;