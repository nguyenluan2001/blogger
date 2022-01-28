import { createSlice } from "@reduxjs/toolkit";
import { POST_STATUS_ENUM } from "utils/constances";
import { strapi } from "utils/strapi";
const initialState={
    draftPosts:[],
    publicPosts:[],
    anyonePosts:[],
    totalPosts: null
}
const postManagementSlice = createSlice({
    name:"postManagement",
    initialState,
    reducers:{
        initPosts: (state, action )=>{
            let {posts} = action.payload;
            let draftPosts = posts.filter((post) => post.status === POST_STATUS_ENUM.DRAFT);
            let publicPosts = posts.filter((post) => post.status === POST_STATUS_ENUM.PUBLIC);
            let anyonePosts = posts.filter((post) => post.status === POST_STATUS_ENUM.ANYONE);
            state.draftPosts = draftPosts;
            state.publicPosts = publicPosts;
            state.anyonePosts = anyonePosts;
            state.totalPosts = posts?.length;
        },
        getPosts:(state, action) => {
            const {status, posts} = action.payload;
            switch(status) {
                case POST_STATUS_ENUM.DRAFT: {
                    state.draftPosts = posts
                    break;
                }
                case POST_STATUS_ENUM.PUBLIC: {
                    console.log("public redux post", posts)
                    state.publicPosts = posts
                    break;
                }
                case POST_STATUS_ENUM.ANYONE: {
                    state.anyonePosts = posts
                    break;
                }
                default: {
                    return initialState;
                }
            }
        },
        deletePostRedux:(state, action) => {
            let {status, id} = action.payload;
            console.log("action.payload", action.payload)
            switch(status) {
                case POST_STATUS_ENUM.DRAFT: {
                    let newPosts = [...state.draftPosts].filter((post) => post.id !== id);
                    state.draftPosts = newPosts;
                    break;
                }
                case POST_STATUS_ENUM.PUBLIC: {
                    let newPosts = [...state.publicPosts].filter((post) => post.id !== id);
                    state.publicPosts = newPosts;
                    break;
                }
                case POST_STATUS_ENUM.ANYONE: {
                    let newPosts = [...state.anyonePosts].filter((post) => post.id !== id);
                    state.anyonePosts = newPosts;
                    break;
                }
                default :{
                    return initialState;
                }
            }
            // let newPosts = [...state].filter((post) => post.id !== id)
            // return newPosts;
        }
    }
})
export const {initPosts, getPosts, deletePostRedux} = postManagementSlice.actions;
const fetchPosts = () => async (dispatch) => {
    let posts = await strapi.find("posts");
    dispatch(initPosts({posts}))
}
export {fetchPosts};
export default postManagementSlice.reducer;