import { Stack } from "@mui/material";
import MainLayout from "components/layouts/MainLayout";
import Sidebar from "components/me/sidebar";
const MeLayout = ({ children }) => {
    return (
        <>
            <MainLayout>
                <Stack direction="row" pt={3}>
                    <Sidebar></Sidebar>
                    {children}
                </Stack>
            </MainLayout>
        </>
    )
}
export default MeLayout;