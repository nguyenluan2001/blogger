import { Icon } from "@iconify/react";
import eyeIcon from '@iconify/icons-mdi/eye';
import bookmarkIcon from '@iconify/icons-mdi/bookmark';
import commentTextMultiple from '@iconify/icons-mdi/comment-text-multiple';

import { Avatar, Chip, Stack, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment";
import Link from "next/link";
import { makeStyles } from '@mui/styles';
import { useRouter } from "next/router";
import { editPost } from "api/post/edit_post";
const useStyles = makeStyles({
    titleHover: {
        '&:hover':{
            color:"blue",
            cursor: 'pointer'
        }
    }
});
const PostItem = ({ post }) => {
    const createdAt = new Date(post?.created_at);
    const classes = useStyles();
    const router = useRouter();
    const handleClickPost = async() => {
        try{
            await editPost({
                post_id: post?.id,
                data: {
                    views: post?.views + 1
                }
            })
            router.push(`/p/${post?.slug}`)
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Stack py={3} direction="row" spacing={2} sx={{borderBottom: '1px solid rgba(0,0,0,0.3)'}}>
            <Box>
                <Avatar src="/static/avatar/avatar_1.jpg"></Avatar>
            </Box>
            <Box>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Link href="#">
                        <a variant="subtitle1" style={{ color: "blue" }}>{post?.user?.username}</a>
                    </Link>
                    <Typography variant="subtitle1">About {moment(Date.now() - createdAt).utc().format("H:m:s")} minutes ago</Typography>
                    <Stack direction="row" spacing={1}>
                        {post?.tags?.map((tag) => {
                            return  <Chip label={tag?.name} clickable href="#" component="a"  size="small" />
                        })}
                    </Stack>
                </Stack>
                <Typography variant="h6" className={classes.titleHover} onClick={() => handleClickPost()}>
                    {post?.title}
                    {/* <Link href={`/p/${post?.slug}`}>{post?.title}</Link> */}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Tooltip title="Views: 20" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{width:"fit-content"}}>
                            <Icon icon={eyeIcon}></Icon>
                            <Typography variant="subtitl1">10</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Bookmarks: 20" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{width:"fit-content"}}>
                            <Icon icon={bookmarkIcon}></Icon>
                            <Typography variant="subtitl1">{post?.bookmarks?.length}</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Comments: 20" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{width:"fit-content"}}>
                            <Icon icon={commentTextMultiple}></Icon>
                            <Typography variant="subtitl1">10</Typography>
                        </Stack>
                    </Tooltip>
                </Stack>
            </Box>

        </Stack>
    )
}
export default PostItem;