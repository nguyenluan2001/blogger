import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";

const useStyles = makeStyles({
    container: {
        border: '1px solid gray',
        width: 'fit-content',
        borderRadius: '10px',
        overflow: 'hidden',
        marginRight: '10px',
        marginBottom: '10px',
    },
    tagName: {
        padding: '5px',
        fontSize: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    tagPosts: {
        padding: '5px',
        fontSize: '15px',
        background: '#5488c7',
        color: 'white',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
})
const TagItem = ({tag}) => {
    const classes = useStyles();
    return (
        <>
            <a href={`/tags/${tag?.slug}`}>
                <Stack direction="row" className={classes.container}>
                    <Box className={classes.tagName}>
                        {tag?.name}
                    </Box>
                    <Box className={classes.tagPosts}>
                        {tag?.posts?.length}
                    </Box>

                </Stack>
            </a>
        </>
    )
}
export default TagItem;