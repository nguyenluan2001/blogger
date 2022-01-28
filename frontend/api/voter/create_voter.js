import { strapi } from "../../utils/strapi";
const createVoter = async ({data, query}) => {
    try{
        await strapi.create("voters", data, query);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {createVoter};