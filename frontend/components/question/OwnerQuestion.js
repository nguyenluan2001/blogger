import { Avatar, Box, Button, Link, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import starIcon from '@iconify/icons-mdi/star';
import accountPlus from '@iconify/icons-mdi/account-plus';
import helpIcon from '@iconify/icons-mdi/help';
import replyIcon from '@iconify/icons-mdi/reply';
import { Icon } from '@iconify/react';
import { userCurrentUser } from 'hooks/useCurrentUser';
import { editUser } from 'api/user/edit_user';
import { strapi } from 'utils/strapi';
import { useSnackBarHook } from 'hooks/useSnackBarHook';
function OwnerQuestion({ user, question, refetchQuestion }) {
    const { data: currUser, refetch } = userCurrentUser();
    const [isFollowed, setIsFollowed] = useState(false);
    const {openSnackSuccess, openSnackError} = useSnackBarHook();
    const isBookmarked = question?.bookmark_users?.map(item => parseInt(item?.id, 10))?.includes(parseInt(currUser?.id, 10));
    useEffect(() => {
        if (currUser) {
            let listFollowed = currUser?.followings?.map((item) => parseInt(item.id));
            console.log("listFollowed", listFollowed)
            if (listFollowed.includes(parseInt(user?.id))) setIsFollowed(true);
            else setIsFollowed(false);
        }
    }, [currUser])
    const handleClickFollow = async () => {
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
        refetch()
    }
    const handleBookmarkQuestion = async() => {
        try {
            let newBookmark = null;
            if (isBookmarked) {
                newBookmark = await strapi.update('questions', question?.id, {
                    bookmark_users: question?.bookmark_users?.map(item => parseInt(item?.id)).filter(item => item !== currUser?.id),
                });
            } else {
                newBookmark = await strapi.update('questions', question?.id, {
                    bookmark_users: user?.id,
                });
            }
            if(newBookmark) {
                openSnackSuccess({title: 'Bookmark question successfully'});
                refetchQuestion();
            } else openSnackSuccess({title: 'Bookmark question successfully'});
        } catch (error) {
            openSnackError({title: error.message})
        }
    }
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt="Remy Sharp" src="/static/avatar/avatar_1.jpg" />
                <Link href="#">
                    <a>
                        <Typography>{user?.username}</Typography>
                    </a>
                </Link>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={2}>
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
                            <Icon icon={helpIcon}></Icon>
                            <Typography>10</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Posts" placement="bottom" arrow>
                        <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }}>
                            <Icon icon={replyIcon}></Icon>
                            <Typography>10</Typography>
                        </Stack>
                    </Tooltip>
                </Stack>
                {/* <Button variant="outlined" onClick={handleFollowing}>Follow</Button> */}
                {isFollowed
                    ? <Button variant="contained" size="small" color="primary" onClick={() => handleClickFollow()}>Unfollow</Button>
                    : <Button variant="outlined" size="small" color="primary" onClick={() => handleClickFollow()}>Follow</Button>
                }
            </Stack>
            {
                isBookmarked
                ? <Button variant="contained" sx={{ width: '100%' }} onClick={() => handleBookmarkQuestion()} color="secondary">Delete bookmark</Button>
                : <Button variant="contained" sx={{ width: '100%' }} onClick={() => handleBookmarkQuestion()}>Bookmark this question</Button>
            }
            

        </Box>
    )
}

export default OwnerQuestion