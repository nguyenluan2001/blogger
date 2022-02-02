import { Box } from "@mui/system";
import MainLayout from "components/layouts/MainLayout";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import PostItem from "components/post/postItem";
import { useListPosts } from "hooks/useListPosts";
import { userBookmarksOfUser } from "hooks/userBookmarksOfUser";
import { useUserBySlug } from "hooks/useUserBySlug";
import { useRouter } from "next/router";

const Bookmarks = () => {
    const router = useRouter();
    const { user_id: username } = router.query;
    const { data: user, isLoading, refetch: refetchUser } = useUserBySlug({ username });
    // const {data} = userBookmarksOfUser({username});
    const {data: posts} = useListPosts({
        query:{
            bookmarks_in: user?.bookmarks?.map((item) => item.id)
        }
    })
    console.log("posts", posts);
    console.log("userBookmarks", user);
    return (
        <UserProfileLayout>
            <Box>
                {posts && 
                posts?.map((post) => <PostItem post={post}></PostItem>)
                }
            </Box>
        </UserProfileLayout>
    )
}
Bookmarks.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>
}
export default Bookmarks;