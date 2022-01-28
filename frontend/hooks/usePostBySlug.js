import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const usePostBySlug = ({post_slug}) => {
   return useQuery(
       ["usePostBySlug", post_slug], async () => {
        let post = await strapi.find("posts", {
            slug: post_slug
        });
        return post[0];
       }
   )
}
export {usePostBySlug};