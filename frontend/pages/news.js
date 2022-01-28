import { Box } from "@mui/material";
import MainLayout from "../components/layouts/MainLayout";
import PostItem from "../components/post/postItem";
import { useListPosts } from "../hooks/useListPosts";

const News = () => {
    const {data: posts, isLoading} = useListPosts({});
    console.log("posts", posts);
    return (
        <Box>
            News
            {
                posts?.map((post) => {
                    return <PostItem post={post}></PostItem>
                })
            }
        </Box>
    )
}
News.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default News;