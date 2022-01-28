import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const useListTags = () => {
   return useQuery(
       "useListTags", async () => {
        let tags = await strapi.find("tags");
        return tags;
       }
   )
}
export {useListTags};