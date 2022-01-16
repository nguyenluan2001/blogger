import { Box, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack"
const AuthenticationLayout = ({ children }) => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                height: "100vh"
            }}
        >
            <Box
                sx={{
                    width: "50%",
                    // border: "1px solid black",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                }}
            >
                <Typography variant="h3" mt={3} textAlign="center">BLOGGER</Typography>
                <Box p={3}>
                    {children}
                </Box>
            </Box>
        </Stack>
    )
}
export default AuthenticationLayout;