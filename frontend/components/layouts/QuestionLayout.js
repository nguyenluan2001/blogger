import { Icon } from "@iconify/react";
import helpCircle from '@iconify/icons-mdi/help-circle';
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import Banner from "components/Banner";
import MainLayout from "components/layouts/MainLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuestions } from "hooks/useQuestions";
import QuestionList from "components/question/QuestionList";

const tabConfigs = [
    {
        id: 1,
        title: 'Newest',
        url: ''
    },
    {
        id: 2,
        title: 'Unsolved',
        url: 'unsolved'
    },
    {
        id: 3,
        title: 'Followings',
        url: 'followings'
    },
    {
        id: 4,
        title: 'Bookmarked',
        url: 'bookmarked'
    },
]
function QuestionLayout({children}) {
    const router = useRouter();
    console.log('router', router)
    const activeUrl = router.asPath.split("/").pop();
    const activeTab = tabConfigs?.find(item => item.url === activeUrl);
    return (
        <MainLayout  hasBanner={true}>
            <Banner></Banner>
            <Navbar activeTab={activeTab}></Navbar>
            <Container maxWidth="lg">{children}</Container>
        </MainLayout>
    )
}

const WrapNavbar = styled(Stack)({
    background: "black",
    color: 'white',
    fontWeight: 'bold'
})
const TabItem = styled(Stack)(({isActive}) => ({
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
        // background: isActive ? 'white' : 'red',
        width: isActive ? '100%' : '0',
        transition: 'width 0.3s ease-in-out'
    }
}))
const Navbar = ({activeTab}) => {
    const router = useRouter();
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
                        <TabItem direction="column" isActive = {parseInt(tab?.id, 10) === parseInt(activeTab?.id, 10)}>
                            <Link href="#">
                                <a>
                                    <Typography>{tab.title}</Typography>
                                </a>
                            </Link>
                        </TabItem>
                    ))
                }
            </WrapNavbar>
            <Button 
            variant="contained" 
            startIcon={<Icon icon={helpCircle}></Icon>} 
            color="primary"
            onClick={() => router.push("/questions/create")}
            >Create question</Button>
        </Stack>
    )

}
export default QuestionLayout