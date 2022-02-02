import MainLayout from "components/layouts/MainLayout";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import FollowingItem from "components/userProfile/followingItem";
import { userCurrentUser } from "hooks/useCurrentUser";
import { usePostsByUsername } from "hooks/usePostsByUsername";
import { useUserBySlug } from "hooks/useUserBySlug";
import { useRouter } from "next/router";

const Followers = () => {
    const router = useRouter();
    const {user_id: username} = router.query;
    const { data: user, isLoading, refetch: refetchUser } = useUserBySlug({ username })
    const {data: currUser, isLoadingCurrUser, refetch: refetchCurrUser} = userCurrentUser();
    return (
        <UserProfileLayout>
            {
                user && user?.followers?.map((item) => {
                    return <FollowingItem followingUser={item} currUser={currUser} refetchUser={refetchUser} refetchCurrUser={refetchCurrUser} type="follower"></FollowingItem>
                })
            }
        </UserProfileLayout>
    )
}
Followers.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default Followers;