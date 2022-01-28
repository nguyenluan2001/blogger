import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostSlideItem from "components/post/postSlideItem";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
const Slide = ({ title, posts }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <>
            <Box mb={3}>
                <Typography variant="h5">{title}</Typography>
                <Slider {...settings}>
                    {posts?.map((post) => {
                        return <PostSlideItem post={post}></PostSlideItem>
                    })}
                </Slider>
            </Box>
        </>
    )
}
export default Slide;