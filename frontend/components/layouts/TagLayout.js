import { Box, Button, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-mdi/plus';
import checkIcon from '@iconify/icons-mdi/check';
import { makeStyles } from "@mui/styles";
import TagItem from "components/tag/tagItem";
import { usePopularTags } from "hooks/usePopularTags";
import { userCurrentUser } from "hooks/useCurrentUser";
import { editUser } from "api/user/edit_user";
import { useTagBySlug } from "hooks/useTagBySlug";
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
        title: 'Followers',
        uri: 'followers'
    },
]
const useStyles = makeStyles({
    title: {
        display: 'flex',
        alignItems: 'end',
        gridGap: '0 10px',
        '&::after': {
            content: '""',
            display: 'block',
            flex: 1,
            height: '1px',
            background: 'gray',
        }
    }
})
const TagLayout = ({ children}) => {
    const router = useRouter();
    // const router = useRouter();
    const {tag_id: tag_slug} = router.query;
    const {data: tag} = useTagBySlug({tag_slug})
    const [activeTabValue, setActiveTabValue] = useState(0);
    const classes = useStyles();
    const { data: tags, refetch: refetchTags } = usePopularTags();
    const { data: user, refetch: refetchUser } = userCurrentUser();
    console.log("userTag", user)
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
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <TopSection tag={tag} user={user} refetchTags={refetchTags} refetchUser={refetchUser}>
            </TopSection>
            <Stack direction="row" spacing={3}>
                <Box sx={{ flex: 3 }}>
                    <Tabs value={activeTabValue} aria-label="basic tabs example">
                        {
                            tabsConfig.map((item,index) => {
                                return <Tab key={index} label={item.title} component="a" href={`/tags/${tag?.slug}/${item.uri}`}></Tab>
                            })
                        }
                    </Tabs>
                    <Box>{children}</Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box
                        className={classes.title}
                    >
                        <Typography variant="subtitle1" sx={{ lineHeight: 1 }}>FLOW SCREEN</Typography>
                    </Box>
                    <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
                        <tbody>
                            <tr >
                                <td style={{ border: '1px solid black', padding: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>{tag?.posts?.length}</Typography>
                                    <Typography sx={{ color: 'gray' }}>Posts</Typography>
                                </td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>1K</Typography>
                                    <Typography sx={{ color: 'gray' }}>Questions</Typography>
                                </td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>1K</Typography>
                                    <Typography sx={{ color: 'gray' }}>Followings</Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Box
                        className={classes.title}
                        sx={{ mt: 3 }}
                    >
                        <Typography variant="subtitle1" sx={{ lineHeight: 1 }}>POPULAR TAGS</Typography>
                    </Box>
                    <Stack
                        direction="row"
                        mt={3}
                        sx={{
                            flexWrap: 'wrap'
                        }}
                    >
                        {tags && tags.map(tag => {
                            return <TagItem tag={tag}></TagItem>
                        })}
                    </Stack>
                </Box>

            </Stack>
        </Container>
    )
}
const TopSection = ({ tag, user, refetchTags, refetchUser }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    useEffect(() => {
        if (user && tag) {
            let tagsId = user?.tags?.map((item) => item.id)
            console.log("tagsId", tagsId)
            console.log("tag", tag)
            if (tagsId.includes(parseInt(tag?.id))) setIsFollowed(true)
            else setIsFollowed(false)
        }
    }, [user, tag])
    console.log("isFollowed", isFollowed)
    const handleFollowTag = async () => {
        let tagsId = user?.tags?.map((item) => item.id)
        if (tagsId) {
            if (isFollowed) {
                tagsId = tagsId.filter((item) => parseInt(item) !== parseInt(tag.id))
                console.log("tagsId", tagsId)
                await editUser({
                    user_id: user?.id,
                    data: {
                        tags: tagsId
                    }
                })
            } else {
                tagsId.push(tag.id)
                await editUser({
                    user_id: user?.id,
                    data: {
                        tags: tagsId
                    }
                })
            }
        } else {
            await editUser({
                user_id: user?.id,
                data: {
                    tags: [tag?.id]
                }
            })
        }
        refetchTags();
        refetchUser();
    }
    return (
        <Stack direction="row" spacing={2}>
            <Box
                sx={{
                    height: '80px',
                    width: '80px',
                    background: 'blue',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography sx={{ color: 'white' }}>{tag?.slug}</Typography>
            </Box>
            <Box>
                <Typography variant="h5">{tag?.name}</Typography>
                <Button
                    variant={isFollowed ? 'contained' : 'outlined'}
                    startIcon={<Icon icon={isFollowed ? checkIcon : plusIcon}></Icon>}
                    onClick={() => handleFollowTag()}
                >{isFollowed ? "Unfollow" : "Follow"}</Button>
            </Box>
        </Stack>
    )
}
export default TagLayout;