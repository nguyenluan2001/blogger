import { TextField, Box, Autocomplete, Button, Checkbox } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";

// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then(mod => mod.Editor),
    { ssr: false }
)
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
let htmlToDraft = null;
if (typeof window === 'object') {
    htmlToDraft = require('html-to-draftjs').default;
}
import { useEffect, useState } from "react";
import { useSnackBarHook } from "../../hooks/useSnackBarHook";
import { userCurrentUser } from "../../hooks/useCurrentUser";
import { createPost } from "../../api/post/create_post";
import { strapi } from "../../utils/strapi";
import { useListTags } from "../../hooks/useListTags";
import { useRouter } from "next/router";
import slugify from 'react-slugify';
import { editPost } from "../../api/post/edit_post";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const tags = [
//     { id: 1, tag: "HTML" },
//     { id: 2, tag: "CSS" },
//     { id: 3, tag: "ReactJs" },
//     { id: 4, tag: "Nodejs" },
// ]
const QuestionEdit = ({ post }) => {
    const { control, handleSubmit, setValue, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title,
                tags: null,
                content: ""
            }
        }
    )
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const { openSnackSuccess, openSnackError } = useSnackBarHook();
    const router = useRouter();
    const { data: user, isLoading } = userCurrentUser();
    const { data: tags, isLoadingTags } = useListTags();
    const [tagsForSelect, setTagsForSelect] = useState(null);
    useEffect(() => {
        if (post) {
            setValue("title", post?.title)
            setValue("tags", post?.tags)
            setEditorState(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        htmlToDraft(post?.content)
                    )
                )
            )
            const tagsId = post?.tags.map((tag) => tag.id);
            let newTags = tags?.filter((tag) => {
                return !tagsId.includes(tag.id)
            })
            setTagsForSelect(newTags);
        }
    }, [post, tags])
    useEffect(() => {
        setTagsForSelect(tags)
    }, [tags])
    const onChange = (state) => {
        console.log("state", state);
        setEditorState(state);
    }
    const onSubmit = async (values) => {
        values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        let newQuestion = {
            ...values,
            owner: user?.id,
            tags: values.tags?.map((tag) => tag.id),
            slug: slugify(values.title)
        }
        console.log("newQuestion", newQuestion);
        try {
            // await createPost(newPost);
            const question = await strapi.create("questions", newQuestion);
            if(question) {
                openSnackSuccess({ title: "Create question successfully" });
                router.push(`/q/${question.slug}`)

            }
        } catch (error) {
            openSnackError({ title: error.message });
        }

        // let newPost = {...values, }
        // console.log("values", values);
    }
    const onEdit = async (values) => {
        console.log("values", values)
        values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        let data = {
            ...values,
            tags: values.tags?.map((tag) => tag.id),
            slug: slugify(values.title)
        }
        try {
            await editPost({post_id: post?.id, data});
            // await strapi.create("posts", newPost)
            console.log("data", data);
            openSnackSuccess({ title: "Create post successfully" });
            router.push("/news")
        } catch (error) {
            openSnackError({ title: error.message });
        }
    }
    console.log("post", post);
    console.log("getValues", getValues());
    return (
        <>
            <Box py={3}>
                <Box mb={2}>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => <TextField variant="outlined" fullWidth {...field} placeholder="Title"></TextField>}
                    >
                    </Controller>
                </Box>
                <Box mb={2}>
                    {(
                                <Controller
                                    control={control}
                                    name="tags"
                                    render={({ field }) => {
                                        return <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={tagsForSelect || []}
                                            getOptionLabel={(option) => option?.name}
                                            defaultValue={post?.tags}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    placeholder="Tags"
                                                />
                                            )}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                  <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                  />
                                                  {option?.name}
                                                </li>
                                              )}
                                            onChange={(event, newValue) => {
                                                field.onChange(newValue)
                                            }}
                                        />
                                    }}
                                />
                            )}
                </Box>
                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <Box
                            sx={{
                                height: 350,
                                border: "1px solid black"
                            }}
                        >
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={(state) => {
                                    // let content =  draftToHtml(convertToRaw(state.getCurrentContent()))
                                    // field.onChange(state);
                                    setEditorState(state)
                                }}
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
                        </Box>
                    )}
                ></Controller>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        mt: 2
                    }}
                >
                    {
                        post
                            ? <Button variant="contained" color="primary" onClick={handleSubmit(onEdit)}>Save changes</Button>
                            : <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Save</Button>
                    }
                </Box>
            </Box>
        </>
    )
}
export default QuestionEdit;