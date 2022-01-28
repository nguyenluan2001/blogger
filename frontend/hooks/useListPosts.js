import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const useListPosts = ({query}) => {
   return useQuery(
       "useListPosts", async () => {
        let posts = await strapi.find("posts", {
            _sort: "created_at",
            ...query
        });
        return posts;
       }
   )
}
export {useListPosts};