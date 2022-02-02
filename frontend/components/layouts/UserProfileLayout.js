import { Button, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useUserBySlug } from "hooks/useUserBySlug";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { userCurrentUser } from "hooks/useCurrentUser";
import { editUser } from "api/user/edit_user";
const tabsConfig = [
    {
        id: 0,
        title: 'Posts',
        uri: ''
    },
    {
        id: 1,
        title: 'Series',
        uri: 'series'
    },
    {
        id: 2,
        title: 'Questions',
        uri: 'questions'
    },
    {
        id: 3,
        title: 'Answers',
        uri: 'answers'
    },
    {
        id: 4,
        title: 'Bookmarks',
        uri: 'bookmarks'
    },
    {
        id: 5,
        title: 'Followers',
        uri: 'followers'
    },
    {
        id: 6,
        title: 'Following',
        uri: 'following'
    },
    {
        id: 7,
        title: 'Tags',
        uri: 'tags'
    },
    {
        id: 8,
        title: 'Reputations',
        uri: 'reputations'
    },
    {
        id: 9,
        title: 'Contact',
        uri: 'contact'
    },

]
const UserProfileLayout = ({ children }) => {
    const router = useRouter();
    const { user_id: username } = router.query;
    const [activeTabValue, setActiveTabValue] = useState(0);
    const { data: user, isLoading } = useUserBySlug({ username })
    const {data: currUser, isLoadingCurrUser, refetch: refetchCurrUser} = userCurrentUser();
    const [totalViews, setTotalViews] = useState(null);
    console.log("user", user)
    useEffect(() => {
        if (router.asPath) {
            console.log("router", router);
            let path = router.asPath;
            if (path.split("/").length === 3) {
                setActiveTabValue(0)
            } else {
                let uri = path.split("/").slice(-1)[0];
                let activeTab = tabsConfig.find((item) => item.uri === uri);
                setActiveTabValue(activeTab.id);
            }
        }
    }, [router])
    useEffect(() => {
        if(user && !isLoading) {
            console.log("posts", user?.posts)
            let views = 0;
            user?.posts?.forEach((item) => views += item?.views)

            // let v = user?.posts?.reduce((total, item) => {
            //     return {
            //         views: total?.views ? (total?.views + item?.views) : item?.views
            //     }
            // });
            setTotalViews(views)
        }
    }, [user])
    return (
        <Container maxWidth="lg" sx={{ marginTop: 5 }}>
            <UserInfo user={user} currUser={currUser} refetchCurrUser={refetchCurrUser}></UserInfo>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTabValue} aria-label="basic tabs example">
                    {
                        tabsConfig.map((item) => {
                            return (
                                <Tab label={item.title} component="a" href={`/u/${user?.username}/${item.uri}`}></Tab>
                            )
                        })
                    }
                </Tabs>
            </Box>
            <Stack direction="row" spacing={5} sx={{mt: 5}}>
                <Box sx={{ flex: 4 }}>
                    {children}
                </Box>
                <Box sx={{ flex: 1, border: '1px solid gray', height: 'fit-content', p: 3}}>
                    <Link href={`/u/${user?.username}`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                                sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Total views</Typography>
                                <Typography>{totalViews}</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/reputations`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Reputations</Typography>
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/tags`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Tags</Typography>
                                <Typography>{user?.tags?.length}</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/following`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Following</Typography>
                                <Typography>{user?.followings?.length}</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/followers`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Followers</Typography>
                                <Typography>{user?.followers?.length}</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Posts</Typography>
                                <Typography>{user?.posts?.length}</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/bookmarks`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Bookmarks</Typography>
                                <Typography>{user?.bookmarks?.length}</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/questions`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Questions</Typography>
                                <Typography>0</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${user?.username}/answers`}>
                        <a>
                            <Stack direction="row" justifyContent="space-between"
                               sx={{
                                    'p:first-child':{
                                        color: 'gray'
                                    },
                                    'p:last-child':{
                                        fontWeight: 'bold'
                                    },
                                    '&:hover':{
                                        'p:last-child': {
                                            color: 'blue'
                                        }
                                    }
                                }}
                            >
                                <Typography>Answers</Typography>
                                <Typography>0</Typography>
                            </Stack>
                        </a>
                    </Link>

                </Box>
            </Stack>
        </Container>
    )
}
const UserInfo = ({ user, currUser, refetchCurrUser }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    useEffect(() => {
        if (user && currUser) {
                let listFollowed = currUser?.followings?.map((item) => item.id);
                if (listFollowed.includes(user?.id)) setIsFollowed(true);
                else setIsFollowed(false);
        }
    }, [user, currUser])
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
        refetchCurrUser();
    }
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        overflow: "hidden"
                    }}
                >
                    <img src="/static/avatar/avatar_1.jpg" style={{ width: "100%" }}></img>
                </Box>
                <Box>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h4">{user?.fullname}</Typography>
                       {user?.id !== currUser?.id && (
                           isFollowed
                           ? <Button variant="contained" color="primary" onClick={() => handleClickFollow()}>Unfollow</Button>
                           : <Button variant="outlined" color="primary" onClick={() => handleClickFollow()}>Follow</Button>
                       )}
                    </Stack>
                    <Typography>@{user?.username}</Typography>
                </Box>
            </Stack>
        </>
    )
}
export default UserProfileLayout;