import { Icon } from "@iconify/react";
import helpCircle from '@iconify/icons-mdi/help-circle';
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import Banner from "components/Banner";
import MainLayout from "components/layouts/MainLayout";
import Link from "next/link";

const Questions = () => {
    return (
        <Box>
            <Banner></Banner>
            <Navbar></Navbar>
            questions
        </Box>
    )
}
const tabConfigs = [
    {
        id: 1,
        title: 'Newest',
        url: ''
    },
    {
        id: 1,
        title: 'Unsolved',
        url: 'unsolved'
    },
    {
        id: 1,
        title: 'Follwings',
        url: 'followings'
    },
    {
        id: 1,
        title: 'Bookmarked',
        url: 'bookmarked'
    },
]
const WrapNavbar = styled(Stack)({
    background: "black",
    color: 'white',
    fontWeight: 'bold'
})
const TabItem = styled(Stack)({
    '&:hover': {
        '&::after': {
            width: '100%'
        }
    },
    '&::after': {
        content: '""',
        display: 'flex',
        height: '3px',
        background: 'white',
        width: '0',
        transition: 'width 0.3s ease-in-out'
    }
})
const Navbar = () => {
    return (
        <Stack 
        direction="row" 
        px={20} py={4} 
        alignItems="center" 
        justifyContent="space-between"
        sx={{
            background: 'black'
        }}
        >
            <WrapNavbar direction="row" spacing={3}>
                {
                    tabConfigs.map((tab) => (
                        <TabItem direction="column">
                            <Link href="#">
                                <a>
                                    <Typography>{tab.title}</Typography>
                                </a>
                            </Link>
                        </TabItem>
                    ))
                }
            </WrapNavbar>
            <Button variant="contained" startIcon={<Icon icon={helpCircle}></Icon>} color="primary">Create question</Button>
        </Stack>
    )

}
Questions.getLayout = function getLayout(page) {
    return (
        <MainLayout hasBanner={true}>{page}</MainLayout>
    )
}
export default Questions;