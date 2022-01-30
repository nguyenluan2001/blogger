import { strapi } from "../../utils/strapi";
const createBookmark = async (data) => {
    try{
        console.log("data", data);
        await strapi.create("bookmarks", data);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {createBookmark};