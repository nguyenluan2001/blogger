import { Icon } from "@iconify/react";
import starIcon from '@iconify/icons-mdi/star';
import pencilIcon from '@iconify/icons-mdi/pencil';
import accountPlus from '@iconify/icons-mdi/account-plus';
import eyeIcon from '@iconify/icons-mdi/eye';
import commentMultiple from '@iconify/icons-mdi/comment-multiple';
import bookmarkIcon from '@iconify/icons-mdi/bookmark';
import arrowDownDropCircle from '@iconify/icons-mdi/arrow-down-drop-circle';
import arrowUpDropCircle from '@iconify/icons-mdi/arrow-up-drop-circle';
import closeCircleOutline from '@iconify/icons-mdi/close-circle-outline';

import { Stack, Box, Typography, Tooltip, Container, IconButton, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MainLayout from "components/layouts/MainLayout";
import { usePostBySlug } from "hooks/usePostBySlug";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useListPosts } from "hooks/useListPosts";
import PostSlideItem from "components/post/postSlideItem";
import Slide from "components/Slide";
import { userCurrentUser } from "hooks/useCurrentUser";
import { useSnackBarHook } from "hooks/useSnackBarHook";
import { votePost } from "api/post/vote_post";
import { createVoter, createVoters } from "api/voter/create_voter";
import { VOTE_TYPE_ENUM } from "utils/constances";
import { editPost } from "api/post/edit_post";
import { deleteVoter } from "api/voter/delete_voter";
import { current } from "@reduxjs/toolkit";
import { createBookmark } from "api/bookmark/create_bookmark";
import { deleteBookmard, deleteBookmark } from "api/bookmark/delete_bookmark";
import { editUser } from "api/user/edit_user";
const PostDetail = () => {
    const router = useRouter();
    const { post_id: post_slug } = router.query;
    const { data: post, isLoading, refetch } = usePostBySlug({ post_slug });
    const { data: relativePosts, isLoadingPosts } = useListPosts({
        query: {
            tags_in: post?.tags?.map((item) => item.id)
        }
    })
    const { data: postsOfUser } = useListPosts({
        query: {
            user: post?.user?.id
        }
    })
    const { data: currUser, isLoadingUser, refetch: refetchUser } = userCurrentUser();
    console.log("currUser", currUser);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <Box>
            <Banner></Banner>
            <Container maxWidth="lg">
                <Stack direction="row" mb={5}>
                    <Stack sx={{ flex: 2, mt: 10 }} direction="row" spacing={3}>
                        <InteractSection post={post} refetch={refetch} currUser={currUser}></InteractSection>
                        <Box sx={{ flex: 1 }}>
                            <PostHeader post={post} user={currUser} refetch={refetch} refetchUser={refetchUser}></PostHeader>
                            <PostContent post={post}></PostContent>
                        </Box>
                    </Stack>
                    <Box sx={{ flex: 1 }}>
                    </Box>
                </Stack>
                <Slide title="Relative posts" posts={relativePosts}></Slide>
                <Slide title={`Posts of ${post?.user?.fullname}`} posts={postsOfUser}></Slide>
                <Box sx={{ height: '200px' }}></Box>
            </Container>

        </Box>
    )
}
const Banner = () => {
    const banners = [
        "/static/banner/banner1.jpg",
        "/static/banner/banner2.jpg",
    ]
    const [usedBanner, setUsedBanner] = useState("/static/banner/banner1.jpg");
    useEffect(() => {
        let index = Math.floor(Math.random() * banners.length);
        setUsedBanner(banners[index])
    }, [])
    return (
        <>
            <Box
                sx={{
                    height: "200px",
                    backgroundImage: `url(${usedBanner})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0% 50%"

                }}
            >
            </Box>
        </>
    )
}
const PostHeader = ({ post, user, refetch, refetchUser }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    useEffect(() => {
       if(user && post) {
        let fetchUser = user?.followings?.find((item) => parseInt(item.id) === parseInt(post?.user?.id));
        console.log("fetchUser", fetchUser);
        if(fetchUser) setIsFollowed(true);
        else setIsFollowed(false);
       }
    }, [user, post])
    console.log("isFollowed", isFollowed)
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleFollow = async () => {
        let listFollowings = user?.followings?.map((item) => item?.id)
        if(isFollowed) {
            let newListFollowings = listFollowings.filter((item) => item != post?.user?.id);
            await editUser({
                user_id: user?.id,
                data: {
                    followings: newListFollowings
                }
            })
        } else {
            listFollowings.push(post?.user?.id)
            await editUser({
                user_id: user?.id,
               data: {
                followings: listFollowings
               }
            })
        }
        refetch();
        refetchUser();
    }
    return (
        <>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ height: "60px" }}>
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
                <Box sx={{ flex: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle2" color="primary">
                            <Link href="/abc">luannguyen</Link>
                        </Typography>
                        <Typography variant="subtitle2">@{post?.user?.username}</Typography>
                        {parseInt(post?.user?.id) !== parseInt(user?.id)
                            && (
                                isFollowed
                                ?<Button variant="contained" color="primary" size="small" onClick={()=>handleFollow()}>Unfollow</Button>
                                :<Button variant="outlined" color="primary" size="small" onClick={()=>handleFollow()}>Follow</Button>
                            )
                        }
                    </Stack>
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
                                <Typography>{post?.user?.followers?.length}</Typography>
                            </Stack>
                        </Tooltip>
                        <Tooltip title="Posts" placement="bottom" arrow>
                            <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }}>
                                <Icon icon={pencilIcon}></Icon>
                                <Typography>10</Typography>
                            </Stack>
                        </Tooltip>
                    </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Views">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Icon icon={eyeIcon} style={{ fontSize: "25px" }}></Icon>
                            <Typography>{post?.views}</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Comments">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Icon icon={commentMultiple} style={{ fontSize: "25px" }}></Icon>
                            <Typography>0</Typography>
                        </Stack>
                    </Tooltip>
                    <Tooltip title="Bookmarks">
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setOpenDialog(true)}
                        >
                            <Icon icon={bookmarkIcon} style={{ fontSize: "25px" }}></Icon>
                            <Typography>{post?.bookmarks?.length}</Typography>
                        </Stack>
                    </Tooltip>
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="sm"
                        fullWidth={true}
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ width: '100%' }}>
                            {post?.bookmarks?.length > 0
                                ? `${post?.bookmarks?.length} people bookmarked`
                                : 'No bookmark'
                            }
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5
                                }}
                                onClick={handleCloseDialog}
                            >
                                <Icon icon={closeCircleOutline} style={{ fontSize: '25px' }}></Icon>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            {
                                post?.bookmarks?.map((item) => {
                                    return (
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: "50%",
                                                    overflow: "hidden"
                                                }}
                                            >
                                                <img src="/static/avatar/avatar_1.jpg" style={{ width: "100%" }}></img>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        color: 'blue'
                                                    }
                                                }}
                                            >
                                                <Link href={`/u/${item?.user?.username}`}>{item?.user?.fullname}</Link>
                                            </Typography>
                                            <Typography>
                                                @<Link href={`/u/${item?.user?.username}`}>{item?.user?.username}</Link>
                                            </Typography>
                                        </Stack>
                                    )
                                })
                            }
                        </DialogContent>

                    </Dialog>
                </Stack>

            </Stack>
        </>
    )
}
const PostContent = ({ post }) => {
    return (
        <>
            <Box>
                <Typography variant="h4" my={3}>{post?.title}</Typography>
                <Box
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                ></Box>
                <Box mt={3}>
                    {
                        post?.tags?.map((tag) => (
                            <Chip label={tag?.name} component="a" href="#" clickable></Chip>
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}
const SettingPostButton = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    border: '1px solid black',
    background: 'white',
    overflow: 'hidden',
    padding: 0,
    width: '25px',
    heigth: '25px',
    minWidth: 0
}))
const InteractSection = ({ post, refetch, currUser }) => {
    // const { data: currUser, isLoading } = userCurrentUser();
    const { openSnackError } = useSnackBarHook();
    const [voter, setVoter] = useState(null);
    const [bookmarked, setBookmarked] = useState(null);
    console.table("post", post);
    console.table("user", currUser);
    console.log("voter", voter);
    console.log("bookmarked", bookmarked)
    useEffect(() => {
        if (post) {
            let fetchedVoter = post?.voters?.find((item) => item.user.id == currUser?.id)
            console.log("fetchedVoter", fetchedVoter)
            setVoter(fetchedVoter)
            let fetchedBookmarked = post?.bookmarks?.find((item) => item.user.id == currUser?.id)
            setBookmarked(fetchedBookmarked);
        }
    }, [post])
    const handleVote = async (type) => {
        if (type === "UP") {
            await createVoter({
                data: {
                    post: post?.id,
                    user: currUser?.id,
                    type: VOTE_TYPE_ENUM.UP
                }
            })
            await votePost({
                post_id: post?.id,
                query: {
                    votes: parseInt(post?.votes + 1)
                }
            })
        }
        else {
            await votePost({
                post_id: post?.id,
                query: {
                    votes: parseInt(post?.votes - 1)
                }
            })
            await createVoter({
                data: {
                    post: post?.id,
                    user: currUser?.id,
                    type: VOTE_TYPE_ENUM.DOWN
                }
            })
        }
        refetch();
    }
    const handleClickVote = async (type) => {
        if (voter) {
            if (type === voter?.type) {
                console.log("vote same type")
                await deleteVoter({ voter_id: voter?.id })
                await editPost({
                    post_id: post?.id,
                    data: {
                        votes: type == VOTE_TYPE_ENUM.DOWN ? post?.votes + 1 : post?.votes - 1
                    }
                })
            } else {
                await deleteVoter({ voter_id: voter?.id })
                await createVoter({
                    data: {
                        post: post?.id,
                        user: currUser?.id,
                        type: type
                    }
                })
                await editPost({
                    post_id: post?.id,
                    data: {
                        votes: type == VOTE_TYPE_ENUM.DOWN ? post?.votes - 2 : post?.votes + 2
                    }
                })
            }
        } else {
            handleVote(type)
        }
        refetch();
    }
    const handleBookmark = async () => {
        if (bookmarked) {
            console.log(111)
            await deleteBookmark({ bookmark_id: bookmarked?.id })
        } else {
            await createBookmark({
                post: post?.id,
                user: currUser?.id
            })
        }
        refetch()
    }
    return (
        <Stack sx={{ mt: '60px' }} direction="column" alignItems="center">
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
            <Stack sx={{ width: 'fit-content' }} direction="column" alignItems="center">
                {post?.user?.id === currUser?.id
                    ? (
                        <Tooltip title="You can't vote for you post" placement="right" arrow>
                            <IconButton>
                                <Icon icon={arrowUpDropCircle}></Icon>
                            </IconButton>
                        </Tooltip>
                    )
                    : (
                        <Tooltip title="Upvote" placement="right" arrow>
                            <IconButton onClick={() => handleClickVote("UP")}>
                                <Icon
                                    icon={arrowUpDropCircle}
                                    style={{
                                        color: (parseInt(voter?.user?.id) === parseInt(currUser?.id) && voter?.type === VOTE_TYPE_ENUM.UP) ? 'blue' : ''
                                    }}
                                ></Icon>
                            </IconButton>
                        </Tooltip>
                    )
                }
                <Typography variant="h5">
                    {post?.votes > 0
                        ? `+ ${post?.votes}`
                        : post?.votes
                    }
                </Typography>
                {
                    post?.user?.id === currUser?.id
                        ? (
                            <Tooltip title="You can't vote for you post" placement="right" arrow>
                                <IconButton>
                                    <Icon icon={arrowDownDropCircle}></Icon>
                                </IconButton>
                            </Tooltip>
                        )
                        : (
                            <Tooltip
                                title="Downvote"
                                placement="right"
                                arrow

                            >
                                <IconButton onClick={() => handleClickVote("DOWN")}>
                                    <Icon
                                        icon={arrowDownDropCircle}
                                        style={{
                                            color: (parseInt(voter?.user?.id) === parseInt(currUser?.id) && voter?.type === VOTE_TYPE_ENUM.DOWN) ? 'blue' : ''
                                        }}
                                    ></Icon>
                                </IconButton>
                            </Tooltip>
                        )
                }
            </Stack>
            <Tooltip title="Bookmark this post" placement="right" arrow>
                {(bookmarked) ?
                    (<IconButton onClick={() => handleBookmark()}>
                        <Icon icon={bookmarkIcon} style={{ color: 'blue' }}></Icon>
                    </IconButton>)
                    : (<IconButton onClick={() => handleBookmark()}>
                        <Icon icon={bookmarkIcon}></Icon>
                    </IconButton>)
                }
            </Tooltip>
            <Box>
                <SettingPostButton>
                    A
                </SettingPostButton>
            </Box>
        </Stack>
    )
}
PostDetail.getLayout = function getLayout(page) {
    return <MainLayout hasBanner={true}>{page}</MainLayout>
}
export default PostDetail;