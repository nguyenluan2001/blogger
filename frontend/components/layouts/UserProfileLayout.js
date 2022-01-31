import { Button, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useUserBySlug } from "hooks/useUserBySlug";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
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
    return (
        <Container maxWidth="lg" sx={{ marginTop: 5 }}>
            <UserInfo user={user}></UserInfo>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTabValue} aria-label="basic tabs example">
                    {
                        tabsConfig.map((item) => {
                            return (
                                <Tab label={item.title} component="a" href={`/u/${username}/${item.uri}`}></Tab>
                            )
                        })
                    }
                </Tabs>
            </Box>
            <Stack direction="row" spacing={5}>
                <Box sx={{ flex: 2 }}>
                    {children}
                </Box>
                <Box sx={{ flex: 1, border: '1px solid gray', height: 'fit-content', p: 3}}>
                    <Link href={`/u/${username}`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}/reputations`}>
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
                    <Link href={`/u/${username}/tags`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}/following`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}/followers`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}/bookmarks`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}/questions`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>
                    <Link href={`/u/${username}/answers`}>
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
                                <Typography>500k</Typography>
                            </Stack>
                        </a>
                    </Link>

                </Box>
            </Stack>
        </Container>
    )
}
const UserInfo = ({ user }) => {
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
                        <Button variant="outlined" color="primary">Follow</Button>
                    </Stack>
                    <Typography>@{user?.username}</Typography>
                </Box>
            </Stack>
        </>
    )
}
export default UserProfileLayout;