import { Box } from "@mui/material";
import MainLayout from "../components/layouts/MainLayout";

const News = () => {
    return (
        <Box>
            News
        </Box>
    )
}
News.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    )
}
export default News;