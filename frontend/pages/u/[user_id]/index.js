import { Box } from "@mui/system";
import MainLayout from "components/layouts/MainLayout";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import PostItem from "components/post/postItem";
import { usePostsByUsername } from "hooks/usePostsByUsername";
import { useRouter } from "next/router";
const Posts = () => {
    const router = useRouter();
    const {user_id: username} = router.query;
    const {data:posts, isLoading} = usePostsByUsername({username});
    console.log("posts",posts); 
    return (
        <>
        <UserProfileLayout>
            <Box>
                {
                    posts && posts?.map((post) => {
                        return (
                            <PostItem post={post}></PostItem>
                        )
                    })
                }
            </Box>
        </UserProfileLayout>
        </>
    )
}
Posts.getLayout = function getLayout(page){
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default Posts;