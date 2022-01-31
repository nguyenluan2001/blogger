import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const useUserBySlug = ({username}) => {
   return useQuery(
       ["useUserBySlug", username], async () => {
        let user = await strapi.find("users", {
            username: username
        });
        return user[0];
       
    })
}
export {useUserBySlug};