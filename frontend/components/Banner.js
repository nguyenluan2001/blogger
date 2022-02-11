import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";

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
export default Banner;