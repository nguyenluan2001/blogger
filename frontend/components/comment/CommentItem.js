import React from 'react'
import Link from "next/link";
import { Avatar, Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { borderBottom } from '@mui/system';
function CommentItem({ comment }) {
    return (
        <Box
            sx={{
                py: 3,
                borderBottom: '1px solid rgba(0,0,0,0.3)'
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar alt="Remy Sharp" src="/static/avatar/avatar_1.jpg" />
                <Link href="#">
                    <a>
                        <Typography>{comment?.user?.username}</Typography>
                    </a>
                </Link>
                <Typography>{moment(comment?.created_at).format('MMM DD, hh:mm a')}</Typography>
            </Stack>
            <Box
                dangerouslySetInnerHTML={{ __html: comment?.content }}
            ></Box>
        </Box>
    )
}

export default CommentItem