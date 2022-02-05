import TagLayout from "components/layouts/TagLayout";
import {useRouter} from "next/router";
import { useTagBySlug } from "hooks/useTagBySlug";
import { useListPosts } from "hooks/useListPosts";
import PostItem from "components/post/postItem";
import MainLayout from "components/layouts/MainLayout";
const Question = () => {
    const router = useRouter();
    const {tag_id: tag_slug} = router.query;
    const {data: tag} = useTagBySlug({tag_slug})
    console.log("tag", tag)
    // const {data: posts} = useListPosts({
    //     query:{
    //         ""
    //     }
    // })
    return (
        <>
        <TagLayout tag={tag}>
            {
                tag?.posts?.map((post) => {
                    return <PostItem post={post}></PostItem>
                })
            }
        </TagLayout>
        </>
    )
}
Question.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>
}
export default Question;