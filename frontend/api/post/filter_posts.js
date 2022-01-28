import { strapi } from "../../utils/strapi";
const filterPosts = async ({query}) => {
    try{
        let posts = await strapi.find("posts", query);
        return posts;
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {filterPosts};