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
import lockIcon from '@iconify/icons-mdi/lock';

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
import { getPosts, deletePosts } from "redux/slices/postManagement";
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
const DraftPost = () => {
    const classes = useStyles();
    const { data: tags, isLoadingTags } = useListTags();
    const { data: posts, isLoadingPosts } = useListPosts({
        query: {
            status: POST_STATUS_ENUM.DRAFT
        }
    })
    const [renderPosts, setRenderPosts] = useState(null);
    const draftPosts = useSelector((state) => state.postManagement.draftPosts);
    console.log("draftPosts", draftPosts)
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
    // useEffect(() => {
    //     if (posts) {
    //         setRenderPosts(posts);
    //         dispatch(getPosts({status:POST_STATUS_ENUM.DRAFT ,posts}));
    //     }
    // }, [posts])
    const onFilter = async () => {
        console.log("getValues", getValues());
        let filteredPosts = await filterPosts({
            query: {
                "created_at_gte": moment(getValues("duration.startDate")).toISOString(),
                "created_at_lte": moment(getValues("duration.endDate")).toISOString(),
                "tags": getValues("tag")?.id,
                "title_contains": getValues("keyword").toLowerCase(),
                "status": POST_STATUS_ENUM.DRAFT
            }
        })
        console.log("filteredPosts", filteredPosts)
        dispatch(getPosts({status: POST_STATUS_ENUM.DRAFT, posts: filteredPosts}));
        // setRenderPosts(filteredPosts)
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
            <ListPosts posts={draftPosts} icon={lockIcon} status={POST_STATUS_ENUM.DRAFT}></ListPosts>
        </Box>
    )
}
// const Filter = ({ tags, control, getValues, onFilter, handleSubmit, onError }) => {
//     return (
//         <Stack direction="column" spacing={2} mt={3}>
//             <Stack direction="row" spacing={2}>
//                 <Controller
//                     control={control}
//                     name="duration"
//                     render={({ field }) => (
//                         <LocalizationProvider dateAdapter={DateAdapter}>
//                             <DatePicker
//                                 label="Begin date"
//                                 value={getValues("duration.startDate")}
//                                 onChange={(newValue) => {
//                                     // setValue(newValue);
//                                     // let newDuration = {...field.value.duration}
//                                     let newDuration = Object.assign({}, getValues("duration"))
//                                     newDuration.startDate = newValue;
//                                     field.onChange(newDuration)
//                                 }}
//                                 renderInput={(params) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                     )}
//                 ></Controller>
//                 <Controller
//                     control={control}
//                     name="duration"
//                     render={({ field }) => (
//                         <LocalizationProvider dateAdapter={DateAdapter}>
//                             <DatePicker
//                                 label="End date"
//                                 value={getValues("duration.endDate")}
//                                 onChange={(newValue) => {
//                                     // setValue(newValue);
//                                     // let newDuration = {...field.value.duration}
//                                     let newDuration = Object.assign({}, getValues("duration"))
//                                     console.log("newDuration", newDuration)

//                                     newDuration.endDate = newValue;
//                                     field.onChange(newDuration)
//                                 }}
//                                 renderInput={(params) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                     )}
//                 ></Controller>

//                 <Controller
//                     control={control}
//                     name="tag"
//                     render={({ field }) => (
//                         <Autocomplete
//                             sx={{ flex: 1 }}
//                             options={tags}
//                             getOptionLabel={(opion) => opion.name}
//                             onChange={(e, value) => field.onChange(value)}
//                             renderInput={(params) => <TextField variant="outlined" {...params} placeholder="Tag"></TextField>}
//                         ></Autocomplete>
//                     )}
//                 ></Controller>
//             </Stack>
//             <Controller
//                 control={control}
//                 name="keyword"
//                 render={({ field }) => (
//                     <TextField
//                         InputProps={{
//                             endAdornment: <InputAdornment position="end">
//                                 <IconButton>
//                                     <Icon icon={magnifyIcon}></Icon>
//                                 </IconButton>
//                             </InputAdornment>,
//                         }}
//                         placeholder="Search"
//                         fullWidth
//                         {...field}
//                     ></TextField>
//                 )}
//             ></Controller>
//             <Button variant="contained" color="primary" onClick={handleSubmit(onFilter, onError)}>Filter</Button>
//         </Stack>
//     )
// }
// const ListPosts = ({ posts, setRenderPosts }) => {
//     console.log("")
//     return (
//         <Box mt={4}>
//             {
//                 posts?.map((post) => {
//                     return <PostItemManage post={post} setRenderPosts={setRenderPosts}></PostItemManage>
//                 })
//             }
//         </Box>
//     )
// }
DraftPost.getLayout = function getLayout(page) {
    return <MeLayout>{page}</MeLayout>
}
export default DraftPost;