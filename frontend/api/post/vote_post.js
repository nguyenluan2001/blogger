import { strapi } from "../../utils/strapi";
const votePost = async ({post_id, query}) => {
    try{
        await strapi.update("posts", post_id, query);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {votePost};