import { strapi } from "../../utils/strapi";
const editUser  = async ({user_id, data}) => {
    try{
        console.log("data", data);
        await strapi.update("users",user_id, data);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {editUser};