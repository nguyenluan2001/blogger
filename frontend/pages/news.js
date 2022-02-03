import { Box, Stack, Typography } from "@mui/material";
import MainLayout from "../components/layouts/MainLayout";
import PostItem from "../components/post/postItem";
import { useListPosts } from "../hooks/useListPosts";
import Link from "next/link";
import { Icon } from "@iconify/react";
import menuSwap from '@iconify/icons-mdi/menu-swap';
import replyIcon from '@iconify/icons-mdi/reply';
import eyeIcon from '@iconify/icons-mdi/eye';
import commentMultiple from '@iconify/icons-mdi/comment-multiple';

const NEWEST_POSTS_LIMIT = 5;
const News = () => {
    const { data: posts, isLoading } = useListPosts({});
    console.log("posts", posts);
    const { data: newestPosts } = useListPosts({
        query: {
            _limit: NEWEST_POSTS_LIMIT
        }
    })
    return (
        <Stack direction="row" mt={3} spacing={3}>
            <Box sx={{ flex: 3 }}>
                {
                    posts?.map((post) => {
                        return <PostItem post={post}></PostItem>
                    })
                }
            </Box>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        '&::after': {
                            content: '""',
                            display: 'block',
                            height: '1px',
                            background: 'gray',
                            flex: 1,
                            marginLeft: '10px'

                        },
                        alignItems: 'end'
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>Newest posts</Typography>
                </Box>
                {
                    newestPosts?.map((post) => <NewestPostItem post={post}></NewestPostItem>)
                }
            </Box>
        </Stack>
    )
}
const NewestPostItem = ({ post }) => {
    return (
        <Box
            sx={{
                borderBottom: '1px solid rgba(0,0,0,0.3 )',
                py: 3
            }}
        >
            {post && <Typography variant="subtitle1" sx={{
                '&:hover':{
                    color: 'blue'
                }
            }}>
                <Link href={`/p/${post?.slug}`}>{post?.title}</Link>
            </Typography>}
            <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Icon icon={menuSwap}></Icon>
                    <Typography>0</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Icon icon={replyIcon}></Icon>
                    <Typography>0</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Icon icon={eyeIcon}></Icon>
                    <Typography>0</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Icon icon={commentMultiple}></Icon>
                    <Typography>0</Typography>
                </Stack>
            </Stack>
            <Typography
                sx={{
                    color: 'gray',
                    '&:hover':{
                        color: 'black'
                    }
                }}
            >
                <Link href={`/u/${post?.user?.username}`}>{post?.user?.fullname}</Link>
            </Typography>
        </Box>
    )
}
News.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default News;