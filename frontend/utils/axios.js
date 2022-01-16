import axios from "axios";
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL
})
export default axiosClient;