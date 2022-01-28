import { strapi } from "../../utils/strapi";
const deleteVoter = async ({voter_id, query}) => {
    try{
        await strapi.delete("voters", voter_id);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {deleteVoter};