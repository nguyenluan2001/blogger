import { strapi } from "../../utils/strapi";
const createQuestion = async (data) => {
    try{
        console.log("data", data);
        await strapi.create("questions", data);
    } catch(error) {
        return {
            message: error?.message
        };
    };
};
export {createQuestion};