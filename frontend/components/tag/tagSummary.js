import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-mdi/plus';
import { Box, Button, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const useStyles = makeStyles({
    tagInfo:{
        color: 'gray'
    }
})
function TagSummary({tag}) {
    const classes = useStyles();
    return (
        <Stack 
        direction="row" 
        spacing={2}
        sx={{
            flex: 'calc(100%/3)',
        }}

        >
            <Box>
                <Link href={`/tags/${tag?.slug}`}>
                    <a>
                        <Image src="/static/logo/reactjs.png" height="100" width="100"></Image>
                    </a>
                </Link>
            </Box>
            <Box>
                <Link href={`/tags/${tag?.slug}`}>
                    <a>
                        <Typography 
                        variant="h6" 
                        sx={{
                            '&:hover': {
                                color: 'blue'
                            }
                        }}
                        >{tag.name}</Typography>
                    </a>
                </Link>
                <Stack direction='row' spacing={1} className={classes.tagInfo}>
                    <Typography
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >{tag?.posts?.length}</Typography>
                    <Typography>posts</Typography>
                </Stack>
                <Stack direction='row' spacing={1} className={classes.tagInfo}>
                    <Typography
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >{tag?.questions?.length ?? 0}</Typography>
                    <Typography>questions</Typography>
                </Stack>
                <Stack direction='row' spacing={1} className={classes.tagInfo}>
                    <Typography
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >{tag?.users?.length}</Typography>
                    <Typography>follwers</Typography>
                </Stack>
                <Button variant="outlined" startIcon={<Icon icon={plusIcon}></Icon>}>Follow</Button>
            </Box>
        </Stack>
    );
}

export default TagSummary;
