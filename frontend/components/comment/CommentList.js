import { Box, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import CommentItem from './CommentItem'

const useStyles = makeStyles({
    title:{
        fontSize: '20px',
        fontWeight: 'bold',
        '&::after':{
            content: '""',
            display: 'block',
            height: '2px',
            flex: 1,
            background: 'rgba(0,0,0,0.3)',
            marginLeft: '10px'
        }
    }
})
function CommentList({comments}) {
    const classes = useStyles();
  return (
    <Box sx={{width: '100%', mt: 3}}>
        <Stack direction="row" alignItems="center" className={classes.title}>{comments?.length ?? 0} Answered</Stack>
        {
            comments &&
            comments?.map((comment) => (
                <CommentItem comment={comment}></CommentItem>
            ))
        }
    </Box>
  )
}

export default CommentList