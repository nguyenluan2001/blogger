import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import starIcon from '@iconify/icons-mdi/star';
import pencilIcon from '@iconify/icons-mdi/pencil';
import accountPlus from '@iconify/icons-mdi/account-plus';
import { useUserBySlug } from "hooks/useUserBySlug";
import Link from "next/link";
import { useEffect, useState } from "react";
import { editUser } from "api/user/edit_user";
const FollowingItem = ({ followingUser, currUser, refetchUser, refetchCurrUser, type }) => {
    const { data: user, isLoading } = useUserBySlug({ username: followingUser?.username })
    const [isFollowed, setIsFollowed] = useState(false);
    useEffect(() => {
        if (user && currUser) {
            if (type === "following") {
                let listFollowed = currUser?.followings?.map((item) => item.id);
                if (listFollowed.includes(user?.id)) setIsFollowed(true);
                else setIsFollowed(false);
            } else {
                let listFollowed = currUser?.followers?.map((item) => item.id);
                if (listFollowed.includes(user?.id)) setIsFollowed(true);
                else setIsFollowed(false);
            }
        }
    }, [user, currUser])
    console.log("currUser", currUser)
    const handleFollowing = async () => {
        let listFollowings = currUser?.followings?.map((item) => item?.id)
        if (isFollowed) {
            let newFollowings = listFollowings.filter((item) => parseInt(item) !== parseInt(user?.id))
            await editUser({
                user_id: currUser?.id,
                data: {
                    followings: newFollowings
                }

            })
        } else {
            let newFollowings = [...listFollowings, user?.id];
            console.log("user", user);
            console.log("newFollowings", newFollowings)
            await editUser({
                user_id: currUser?.id,
                data: {
                    followings: newFollowings
                }

            })
        }
    }
    const handleFollower = async () => {
        let listFollowers = currUser?.followers?.map((item) => item?.id)
        if (isFollowed) {
            let newFollowers = listFollowers.filter((item) => parseInt(item) !== parseInt(user?.id))
            await editUser({
                user_id: currUser?.id,
                data: {
                    followers: newFollowers
                }

            })
        } else {
            let newFollowers = [...listFollowers, user?.id];
            await editUser({
                user_id: currUser?.id,
                data: {
                    followers: newFollowers
                }

            })
        }
    }
    const handleClickFollow = async () => {
        if (type == "following")  await handleFollowing();
        else await handleFollower();
        await refetchUser();
        await refetchCurrUser()
    }
    return (
        <Stack direction="row" spacing={2}>
            <Box
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    overflow: "hidden"
                }}
            >
                <img src="/static/avatar/avatar_1.jpg" style={{ width: "100%" }}></img>
            </Box>
            <Box>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        '&:hover': {
                            color: 'blue'
                        }
                    }}
                >
                    {user && <Link href={`/u/${user?.username}`}>{user?.fullname}</Link>}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Reputations" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }}>
                            <Icon icon={starIcon}></Icon>
                            <Typography>10</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Followers" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }}>
                            <Icon icon={accountPlus}></Icon>
                            <Typography>{user?.followers?.length}</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Posts" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }}>
                            <Icon icon={pencilIcon}></Icon>
                            <Typography>{user?.posts?.length}</Typography>
                        </Stack>
                    </Tooltip>
                </Stack>
                {isFollowed
                    ? <Button variant="contained" size="small" color="primary" onClick={() => handleClickFollow()}>Unfollow</Button>
                    : <Button variant="outlined" size="small" color="primary" onClick={() => handleClickFollow()}>Follow</Button>
                }
            </Box>

        </Stack>
    )
}
export default FollowingItem;