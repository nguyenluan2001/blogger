import { Icon } from '@iconify/react'
import { Chip, Link, Stack, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import calendarMonthOutline from '@iconify/icons-mdi/calendar-month-outline';
import replyIcon from '@iconify/icons-mdi/reply';
import menuSwap from '@iconify/icons-mdi/menu-swap';
import commentMultiple from '@iconify/icons-mdi/comment-multiple';
import eyeIcon from '@iconify/icons-mdi/eye';

import moment from 'moment';
import Image from 'next/image';
import styled from '@emotion/styled';
const Avatar = styled(Image)({
  borderRadius: '50%'
})
function QuestionItem({ question }) {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        py: 2,
        borderBottom: '1px solid black'
      }}
    >
      <Box>
        <Stack direction="row" mb={2}>
          <Icon icon={calendarMonthOutline}></Icon>
          <Typography>{moment(question.created_at).format('dddd HH:mm')}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Answers" placement='bottom'>
            <Stack direction="row" sx={{ width: 'fit-content' }} alignItems="center" spacing={1}>
              <Icon icon={replyIcon}></Icon>
              <Typography>{question?.replies?.length}</Typography>
            </Stack>
          </Tooltip>
          <Tooltip title="Scores" placement='bottom'>
            <Stack direction="row" sx={{ width: 'fit-content' }} alignItems="center" spacing={1}>
              <Icon icon={menuSwap}></Icon>
              <Typography>0</Typography>
            </Stack>
          </Tooltip>
          <Tooltip title="Comments" placement='bottom'>
            <Stack direction="row" sx={{ width: 'fit-content' }} alignItems="center" spacing={1}>
              <Icon icon={commentMultiple}></Icon>
              <Typography>{question?.replies?.length}</Typography>
            </Stack>
          </Tooltip>
          <Tooltip title="Views" placement='bottom'>
            <Stack direction="row" sx={{ width: 'fit-content' }} alignItems="center" spacing={1}>
              <Icon icon={eyeIcon}></Icon>
              <Typography>0</Typography>
            </Stack>
          </Tooltip>
        </Stack>
      </Box>
      <Box>
        <Stack
          sx={{
            width: 'fit-content'
          }}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Avatar src="/static/avatar/avatar_1.jpg" width="30" height="30"></Avatar>
          <Link href="#">
            <a>
              <Typography>{question?.owner?.fullname}</Typography>
            </a>
          </Link>
        </Stack>
        <Box>
          <Link href={`/q/${question.slug}`} style={{textDecoration: 'none'}}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: 'black',
                  textDecoration: 'none',
                  py: 1,
                  '&:hover':{
                    color: '#1976d2'
                  }
                }}
              >{question?.title}</Typography>
          </Link>
          <Stack direction="row" spacing={1}> 
            {question?.tags?.map((tag) => {
              return <Chip label={tag?.name} clickable href={`/tags/${tag?.slug}`} component="a" size="small" />
            })}
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default QuestionItem