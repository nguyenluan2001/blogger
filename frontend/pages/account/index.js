import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccountSettingLayout from "components/layouts/AccountSettingLayout";
import { userCurrentUser } from "hooks/useCurrentUser";
import Link from "next/link";

const Account = () => {
    const { data: currUser, isLoading } = userCurrentUser();
    return (
        <Box p={3}>
            <InfoSection user={currUser}></InfoSection>
            <SettingSection></SettingSection>
        </Box>
    )
}
const InfoSection = ({ user }) => {
    return (
        <Stack direction="column" alignItems="center">
            <Box
                sx={{
                    borderRadius: "50%",
                    overflow: 'hidden',
                    width: '150px',
                    height: '150px'
                }}
            >
                <img src={"/static/avatar/avatar_1.jpg"} style={{ width: '100%' }}></img>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Welcome, {user?.fullname}</Typography>
            <Typography variant="subtitle1">Manage your private information and security with Blogger</Typography>
        </Stack>
    )

}
const settings = [
    {
        image: '/static/svg/user.svg',
        title: 'My Information',
        url: '/account/profile/personal'
    },
    {
        image: '/static/svg/password.svg',
        title: 'Password',
        url: '/account/security/password'
    },
    {
        image: '/static/svg/social-network.svg',
        title: 'Connected Account',
        url: '/account/security/connected-accounts'
    },
]
const SettingSection = () => {
    return (
        <>
            <Grid container spacing={2} mt={3}>
                {
                    settings.map((item) => {
                        return <Grid item xs="4">
                            <SettingItem image={item.image} title={item.title} url={item.url}></SettingItem>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}
const SettingItem = ({ image, title, url }) => {
    return (
        <Link href={url}>
            <Stack
                direction="column"
                alignItems="center"
                sx={{
                    background: '#dfe6e9',
                    borderRadius: '10px',
                    p: 3,
                    transition: 'box-shadow 0.2s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px 6px',
                    }
                }}
            >
                <Box
                    sx={{
                        width: "100px",
                        height: "100px",
                        // borderRadius: "50%",
                        overflow: 'hidden',
                    }}
                >
                    <img src={image} style={{ width: '100%' }}></img>
                </Box>
                <Typography variant="h5">{title}</Typography>
            </Stack>
        </Link>
    )
}
Account.getLayout = function getLayout(page) {
    return (
        <AccountSettingLayout>{page}</AccountSettingLayout>
    )
}
export default Account;