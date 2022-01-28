import { Icon } from "@iconify/react";
import starIcon from '@iconify/icons-mdi/star';
import pencilIcon from '@iconify/icons-mdi/pencil';
import accountPlus from '@iconify/icons-mdi/account-plus';
import eyeIcon from '@iconify/icons-mdi/eye';
import commentMultiple from '@iconify/icons-mdi/comment-multiple';
import bookmarkIcon from '@iconify/icons-mdi/bookmark';
import arrowDownDropCircle from '@iconify/icons-mdi/arrow-down-drop-circle';
import arrowUpDropCircle from '@iconify/icons-mdi/arrow-up-drop-circle';
import menuSwap from '@iconify/icons-mdi/menu-swap';

import { Stack, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Link from "next/link";
const useStyles = makeStyles({
    username: {
        '&:hover': {
            textDecoration: 'underline'
        }
    }
})
const PostSlideItem = ({ post }) => {
    const classes = useStyles();
    return (
        <Box
            sx={{
                border: '1px solid rgba(0,0,0,0.3)',
                p: 2,
                width: '280px'
            }}
        >
            <Typography variant="subtitle1">
                <Link href={`/p/${post?.slug}`}>{post?.title}</Link>
            </Typography>
            <Typography variant="body1" component="span" className={classes.username} color="primary">
                <Link href={`/u/${post?.user?.username}`}>{post?.user?.fullname}</Link>
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Views">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Icon icon={eyeIcon} style={{ fontSize: "17px" }}></Icon>
                        <Typography>0</Typography>
                    </Stack>
                </Tooltip>
                <Tooltip title="Comments">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Icon icon={commentMultiple} style={{ fontSize: "17px" }}></Icon>
                        <Typography>0</Typography>
                    </Stack>
                </Tooltip>
                <Tooltip title="Bookmarks">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Icon icon={bookmarkIcon} style={{ fontSize: "17px" }}></Icon>
                        <Typography>0</Typography>
                    </Stack>
                </Tooltip>
                <Tooltip title="Points">
                    <Stack direction="row">
                        <Icon icon={menuSwap} style={{ fontSize: '25px' }}></Icon>
                        <Typography>+1</Typography>
                    </Stack>
                </Tooltip>
            </Stack>
        </Box>
    )
}
export default PostSlideItem;