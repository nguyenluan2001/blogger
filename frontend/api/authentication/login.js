import axiosClient from "../../utils/axios"
import { strapi } from "utils/strapi";
const login = async (data) => {
    await strapi.login({
        identifier: data.email,
        password: data.password
    } )
}
export {login};