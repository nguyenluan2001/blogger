import { Container, Typography, Box, Stack, TextField, Menu, MenuItem, Divider, Button, unstable_ClassNameGenerator, IconButton, Badge } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import fileDocumentOutline from '@iconify/icons-mdi/file-document-outline';
import logoutIcon from '@iconify/icons-mdi/logout';
import bellOutline from '@iconify/icons-mdi/bell-outline';
import squareEditOutline from '@iconify/icons-mdi/square-edit-outline';
import pencilOutline from '@iconify/icons-mdi/pencil-outline';
import formatListCheckbox from '@iconify/icons-mdi/format-list-checkbox';
import Link from "next/link";
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import accountIcon from '@iconify/icons-mdi/account';
import { useState } from "react";
import { userCurrentUser } from "../../hooks/useCurrentUser";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/slices/user";
import { useRouter } from "next/router";
const Header = () => {
    const [anchorUserPopup, setAnchorUserPopup] = useState(null);
    const [openUserPopup, setOpenUserPopup] = useState(false);
    const [anchorCreatePopup, setAnchorCreatePopup] = useState(null);
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const { data: user, isLoading } = userCurrentUser();
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            dispatch(getCurrentUser(user))
        }
    }, [user])
    console.log("user", user);
    console.log("currentUser", currentUser);
    const handleClickUserPopup = (e) => {
        setAnchorUserPopup(e.currentTarget);
        setOpenUserPopup(true)
    }
    const handleCloseUserPopup = () => {
        setOpenUserPopup(false);
    }
    const handleClickCreatePopup = (e) => {
        setAnchorCreatePopup(e.currentTarget);
        setOpenCreatePopup(true)
    }
    const handleCloseCreatePopup = () => {
        setOpenCreatePopup(false);
    }
    return (
        <Box
            sx={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2
                }}
            >
                <Box>
                    <Typography variant="h5">BLOGGER</Typography>
                </Box>
                <Stack direction="row" sx={{ flex: 2, ml: 3 }} spacing={3} >
                    <Typography>
                        <Link href="/posts">Posts</Link>
                    </Typography>
                    <Typography>
                        <Link href="/questions">Questions</Link>
                    </Typography>
                    <Typography>
                        <Link href="/discussions">Discussions</Link>
                    </Typography>
                </Stack>
                <TextField
                    variant="outlined"
                    sx={{ flex: 2, mr: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Icon icon={magnifyIcon} fontSize={20}></Icon>
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Seach on Blogger"
                ></TextField>
                <Stack direction="row" mr={2}>
                    <IconButton>
                        <Badge badgeContent={4} color="primary">
                            <Icon icon={bellOutline}></Icon>
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleClickCreatePopup}>
                        <Icon icon={squareEditOutline}></Icon>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorCreatePopup}
                        open={openCreatePopup}
                        onClose={handleCloseCreatePopup}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={() => router.push("/create/post")}>
                            <ListItemIcon>
                                <Icon icon={pencilOutline}></Icon>
                            </ListItemIcon>
                            <ListItemText>New post</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Icon icon={formatListCheckbox}></Icon>
                            </ListItemIcon>
                            <ListItemText>New series</ListItemText>
                        </MenuItem>
                    </Menu>
                </Stack>
                <Box
                    sx={{
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.5)",
                        width: 40,
                        height: 40,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                    onClick={(e) => handleClickUserPopup(e)}
                >
                    <Typography variant="h5" color="white">U</Typography>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorUserPopup}
                    open={openUserPopup}
                    onClose={handleCloseUserPopup}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={3}
                        p={3}
                        sx={{
                            background: "#f0f0f0"
                        }}
                    >
                        <Box
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: "50%",
                                overflow: "hidden"
                            }}
                        >
                            <img src="/static/avatar/avatar_1.jpg" style={{ width: "100%" }}></img>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" color="primary">{currentUser?.fullname}</Typography>
                            <Typography>@{currentUser?.username}</Typography>
                            <Button variant="contained" color="primary">Edit</Button>
                        </Box>

                    </Stack>
                    <MenuItem>
                        <ListItemIcon>
                            <Icon icon={accountIcon}></Icon>
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>router.push("/me/posts/draft")}>
                        <ListItemIcon>
                            <Icon icon={fileDocumentOutline}></Icon>
                        </ListItemIcon>
                        <ListItemText>Manage content</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Icon icon={logoutIcon}></Icon>
                        </ListItemIcon>
                        <ListItemText>Log out</ListItemText>
                    </MenuItem>
                </Menu>
            </Container>
        </Box>
    )
}
export default Header;