import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const userCurrentUser = () => {
   return useQuery(
       "useCurrentUser", async () => {
        let user = await strapi.fetchUser();
        let fullUser = null;
        if(user) {
            fullUser = await strapi.findOne("users", user?.id)
        }
        return fullUser;
       }
   )
}
export {userCurrentUser};