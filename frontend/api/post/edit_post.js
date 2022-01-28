import { strapi } from "../../utils/strapi";
const editPost = async ({post_id, data}) => {
    try{
        console.log("data", data);
        await strapi.update("posts",post_id, data);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {editPost};