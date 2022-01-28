import MainLayout from "../../components/layouts/MainLayout";
import EditPost from "../../components/post/EditPost";
const CreatePost = () => {
    return (
        <>
            <EditPost></EditPost>
        </>
    )
}
CreatePost.getLayout = function getLayout(page){
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default CreatePost;