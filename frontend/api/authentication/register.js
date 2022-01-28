const { default: axiosClient } = require("../../utils/axios")
import { strapi } from "utils/strapi";
const register = async (data) => {
    await strapi.register(data);
}
export {register};