import lockIcon from '@iconify/icons-mdi/lock';
import dotsHorizontalCircleOutline from '@iconify/icons-mdi/dots-horizontal-circle-outline';
import { Icon } from "@iconify/react";
import { Chip, IconButton, Menu, MenuItem, Stack, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { deletePost } from 'api/post/delete_post';
import { useDispatch } from 'react-redux';
// import { deleteDraftPost } from 'redux/slices/postManagement';
import { useSnackBarHook } from 'hooks/useSnackBarHook';
import { deletePostRedux } from 'redux/slices/postManagement';
import { useRouter } from 'next/router';
const useStyles = makeStyles({
    title: {
        '&:hover': {
            color: 'blue'
        }
    }
})
const PostItemManage = ({ post, icon, status }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = useState(false);
    const {openSnackSuccess, openSnackError} = useSnackBarHook();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleCloseDialog = () =>{
        setOpenDialog(false);
    }
    const handleDeletePost = async() => {
        try
        {
            dispatch(deletePostRedux({status: status, id: post.id}))
            await deletePost({post_id: post?.id})
            setOpenDialog(false)
            openSnackSuccess({title:"Delete post successfully"});
        } catch(error) {
            openSnackError({title: error.message})
        }
    }
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Icon icon={icon}></Icon>
                <Typography variant="h6" className={classes.title}>
                    <Link href="#">{post?.title}</Link>
                </Typography>
                <Stack direction="row" spacing={1}>
                    {post?.tags?.map((tag) => {
                        return <Chip label={tag?.name} clickable href="#" component="a" size="small" />
                    })}
                </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
                <Typography>Last update: {moment(post?.updated_at).format("dddd H:m")}</Typography>
                <IconButton onClick={handleClick}>
                    <Icon icon={dotsHorizontalCircleOutline}></Icon>
                </IconButton>
            </Stack>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => router.push(`/posts/${post?.slug}/edit`)}>Edit</MenuItem>
                <MenuItem onClick={()=>setOpenDialog(true)}>Delete</MenuItem>
            </Menu>
            <Divider></Divider>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure that you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Disagree</Button>
                    <Button onClick={handleDeletePost} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
export default PostItemManage;