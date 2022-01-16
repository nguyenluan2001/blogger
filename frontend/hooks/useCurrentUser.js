import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const userCurrentUser = () => {
   return useQuery(
       "useCurrentUser", async () => {
        let user = await strapi.fetchUser()
        return user;
       }
   )
}
export {userCurrentUser};