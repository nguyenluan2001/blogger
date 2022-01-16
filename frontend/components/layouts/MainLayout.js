import { Box, Container } from "@mui/material"
import Header from "../header"

const MainLayout = ({children}) => {
    return (
        <Box>
            <Header></Header>
            <Container maxWidth="lg">
                {children}
            </Container>
        </Box>
    )
}
export default MainLayout;