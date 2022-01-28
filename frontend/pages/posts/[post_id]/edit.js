import { useRouter } from "next/router";
import EditPost from "components/post/EditPost";
import MainLayout from "components/layouts/MainLayout";
import { usePostBySlug } from "hooks/usePostBySlug";

const EditPostDetail = () => {
    const router = useRouter();
    const { post_id: post_slug } = router.query;
    const { data: post, isLoading } = usePostBySlug({ post_slug });
    console.log("post", post);
    return (
        <>
            <EditPost
                post={post}
            >

            </EditPost>
        </>
    )
}
EditPostDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>
}
export default EditPostDetail;