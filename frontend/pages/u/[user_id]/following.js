import { Grid } from "@mui/material";
import MainLayout from "components/layouts/MainLayout";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import FollowingItem from "components/userProfile/followingItem";
import { userCurrentUser } from "hooks/useCurrentUser";
import { usePostsByUsername } from "hooks/usePostsByUsername";
import { useUserBySlug } from "hooks/useUserBySlug";
import { useRouter } from "next/router";

const Following = () => {
    const router = useRouter();
    const { user_id: username } = router.query;
    const { data: user, isLoading, refetch: refetchUser } = useUserBySlug({ username })
    const { data: currUser, isLoadingCurrUser, refetch: refetchCurrUser } = userCurrentUser();
    return (
        <UserProfileLayout>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 4, sm: 4, md: 4 }}>
                {
                    user?.followings?.map((item) => {
                        return <Grid item xs={4}>
                            <FollowingItem followingUser={item} currUser={currUser} refetchUser={refetchUser} refetchCurrUser={refetchCurrUser} type="following"></FollowingItem>
                        </Grid>
                    })
                }
            </Grid>
        </UserProfileLayout>
    )
}
Following.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default Following;