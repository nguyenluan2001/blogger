import { Autocomplete, Stack, TextField, Typography, Box } from '@mui/material';
import { filterTags } from 'api/tag/filter_tags';
import MainLayout from 'components/layouts/MainLayout';
import TagSummary from 'components/tag/tagSummary';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const orderOptions = [
    {
        id: 1,
        title: 'Followers',
        filter: 'followers'
    },
    {
        id: 2,
        title: 'Posts',
        filter: 'posts'
    },
    {
        id: 3,
        title: 'Questions',
        filter: 'questions'
    }
]
function Tags() {
    const [filter, setFilter] = useState(orderOptions[0]);
    const [tags, setTags] = useState(null);
    useEffect(() => {
        getTags(filter.filter)
    }, [filter])
    const getTags = async (filter) => {
        let fetchedTags = await filterTags(filter)
        setTags(fetchedTags);
    }
    return (
        <Box sx={{ width: '100%', pt: 5 }}>
            <TopSection setFilter={setFilter}></TopSection>
            <Box>
                {/* <TagSummary></TagSummary> */}
                <TagsList tags={tags}></TagsList>
            </Box>
        </Box>
    );
}
export const TopSection = ({ setFilter }) => {
    return (
        <>
            <Stack direction="row" spacing={4}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'end',
                        flex: 1,
                        '&::after': {
                            content: '""',
                            display: 'block',
                            height: '1px',
                            flex: 1,
                            background: 'gray',
                            marginLeft: '20px'
                        }
                    }}
                >
                    <Typography variant="h6">TOPIC</Typography>
                </Box>
                <Stack
                    sx={{
                        flex: 1,
                        transform: 'translate(0, 50%)'
                    }}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography>Order</Typography>
                    <Autocomplete
                        options={orderOptions}
                        getOptionLabel={(option) => option.title}
                        defaultValue={orderOptions[0]}
                        renderInput={(params) => <TextField {...params} />}
                        size="small"
                        sx={{ flex: 0.5 }}
                        onChange={(event, value) => setFilter(value)}
                    ></Autocomplete>
                </Stack>
            </Stack>
        </>
    );
};
const TagsList = ({ tags }) => {
    return (
        <Stack
            direction="row"
            mt={5}
            sx={{
                flexWrap: 'wrap',
                rowGap: '20px'

            }}
        >
            {
                tags && tags?.map((tag) => {
                    return <TagSummary key={tag.id} tag={tag}></TagSummary>
                })
            }
        </Stack>
    )
}
Tags.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>
}
export default Tags;
