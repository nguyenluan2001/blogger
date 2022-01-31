import MainLayout from "components/layouts/MainLayout";
import UserProfileLayout from "components/layouts/UserProfileLayout";

const Series = () => {
    return (
        <>
        <UserProfileLayout>
        series
        </UserProfileLayout>
        </>
    )
}
Series.getLayout = function getLayout(page){
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default Series;