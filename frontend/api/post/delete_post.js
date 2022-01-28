import { strapi } from "../../utils/strapi";
const deletePost = async ({post_id}) => {
    try{
        await strapi.delete("posts",post_id);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {deletePost};