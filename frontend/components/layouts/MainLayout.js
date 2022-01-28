import { Box, Container } from "@mui/material"
import Header from "../header"

const MainLayout = ({ children, hasBanner }) => {
    return (
        <Box>
            <Header></Header>
            {
                hasBanner
                    ? children
                    : <Container maxWidth="lg">
                        {children}
                    </Container>
            }

        </Box>
    )
}
export default MainLayout;