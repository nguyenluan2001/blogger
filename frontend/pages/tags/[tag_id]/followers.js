import { Container, Grid, Stack } from "@mui/material";
import MainLayout from "components/layouts/MainLayout";
import TagLayout from "components/layouts/TagLayout";
import FollowingItem from "components/userProfile/followingItem";
import { userCurrentUser } from "hooks/useCurrentUser";
import { useTagBySlug } from "hooks/useTagBySlug";
import { useRouter } from "next/router";

const Followers = () => {
    const router = useRouter();
    const {tag_id: tag_slug} = router.query;
    const {data: tag, refetch: refetchTag} = useTagBySlug({tag_slug});
    const {data: currUser, isLoadingCurrUser, refetch: refetchCurrUser} = userCurrentUser();
    console.log("tag", tag);
    return (
        <TagLayout>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 4, sm: 4, md: 4 }} mt={2}>
                {
                    tag &&
                    tag?.followers?.map((item) => (
                        <Grid item xs={4}>
                            <FollowingItem followingUser={item} currUser={currUser} refetchUser={refetchTag} refetchCurrUser={refetchCurrUser} type="following"></FollowingItem>
                        </Grid>
                    ))
                }
            </Grid>
        </TagLayout>
    )
}
Followers.getLayout = function getLayout(page){
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default Followers;