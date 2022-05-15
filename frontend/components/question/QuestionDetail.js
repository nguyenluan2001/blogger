import { Icon } from "@iconify/react";
import eyeIcon from '@iconify/icons-mdi/eye';
import bookmarkIcon from '@iconify/icons-mdi/bookmark';
import replyIcon from '@iconify/icons-mdi/reply';
import { Container, Stack, Tooltip, Chip } from "@mui/material";
import { Typography, Box, Button } from "@material-ui/core";
import moment from "moment"
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

import dynamic from "next/dynamic";
import {strapi} from "utils/strapi";
// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSnackBarHook } from "hooks/useSnackBarHook";
import { userCurrentUser } from "hooks/useCurrentUser";
import CommentItem from "components/comment/CommentItem";
import CommentList from "components/comment/CommentList";
import OwnerQuestion from "./OwnerQuestion";
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then(mod => mod.Editor),
    { ssr: false }
)
const QuestionDetail = ({ question, refetch }) => {
    const [comment, setComment] = useState(EditorState.createEmpty());
    const {openSnackError} = useSnackBarHook();
    const { data: user, isLoading } = userCurrentUser();
    const handleSubmitReply = async ()=> {
        try {
            let reply = await strapi.create('question-replies', {
                content: draftToHtml(convertToRaw(comment.getCurrentContent())),
                question: question?.id,
                user: user?.id
            })
            setComment(EditorState.createEmpty())
            refetch()
        } catch (error) {
            openSnackError({title: error.message})
        }
    }
    return (
        <Container
            sx={{
                paddingTop: "30px"
            }}
        >
            <Stack direction="row">
                <Box sx={{ flex: 2 }}>
                    <Stack direction="row" spacing={2} >
                        <Typography>{moment(question?.created_at).format("MMM Do, h:mm A")}</Typography>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title={`Views: ${question?.views}`} placement="bottom" arrow>
                                <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }} spacing={1}>
                                    <Icon icon={eyeIcon}></Icon>
                                    <Typography variant="subtitle1">{question?.views?.length ?? 0}</Typography>
                                </Stack>
                            </Tooltip>
                            <Tooltip title={`Bookmarks: ${question?.bookmarks?.length}`} placement="bottom" arrow>
                                <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }} spacing={1}>
                                    <Icon icon={bookmarkIcon}></Icon>
                                    <Typography variant="subtitle1">{question?.bookmarks?.length ?? 0}</Typography>
                                </Stack>
                            </Tooltip>
                            <Tooltip title={`Replies: ${question?.reply?.length}`} placement="bottom" arrow>
                                <Stack direction="row" alignItems="center" sx={{ width: "fit-content" }} spacing={1}>
                                    <Icon icon={replyIcon}></Icon>
                                    <Typography variant="subtitle1">{question?.reply?.length ?? 0}</Typography>
                                </Stack>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <Typography variant="h4">{question?.title}</Typography>
                    <Stack direction="row" spacing={1}>
                        {question?.tags?.map((tag) => {
                            return <Chip label={tag?.name} clickable href={`/tags/${tag?.slug}`} component="a" size="small" />
                        })}
                    </Stack>
                    <Box
                        dangerouslySetInnerHTML={{ __html: question?.content }}
                    ></Box>
                    <Box>
                        <Typography variant="h6">Write a comment</Typography>
                        <Editor
                            editorState={comment}
                            onEditorStateChange={(state) => setComment(state)}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: {
                                    uploadCallback: "",
                                    alt: { present: true, mandatory: false },
                                },
                            }}
                        />
                        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                            <Button variant="outlined">Cancel</Button>
                            <Button variant="contained" color="primary" onClick={handleSubmitReply}>Comment</Button>
                        </Stack>
                    </Box>
                    {
                        question &&
                        <CommentList comments={question?.replies}></CommentList>

                    }
                </Box>
                <Box sx={{ flex: 1 }}>
                   <OwnerQuestion user={question?.owner} question={question} refetchQuestion={refetch}></OwnerQuestion>
                </Box>
            </Stack>
        </Container>
    )
}
export default QuestionDetail;