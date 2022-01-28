import { strapi } from "../../utils/strapi";
const createPost = async (data) => {
    try{
        console.log("data", data);
        await strapi.create("posts", data);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {createPost};