import { strapi } from "../../utils/strapi";
const deleteBookmark = async ({bookmark_id}) => {
    try{
        await strapi.delete("bookmarks", bookmark_id);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {deleteBookmark};