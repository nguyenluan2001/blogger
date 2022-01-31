import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
// const usePostBySlug = ({post_slug}) => {
//    return useQuery(
//        ["usePostBySlug", post_slug], async () => {
//         let post = await strapi.find("posts", {
//             slug: post_slug
//         });
//         return post[0];
//        }
//    )
// }
const usePostBySlug = ({post_slug}) => {
   return useQuery(
       ["usePostBySlug", post_slug], async () => {
        let post = await strapi.graphql({
            query: `query {
             posts( where: { slug: "${post_slug}"}){
                id
                title
                content
                slug
                status
                votes
                views
                user{
                    id
                    username
                    fullname
                    followers{
                        id
                    }
                }
                tags{
                    id
                    name
                }
                voters{
                    id
                    type
                    user{
                        id
                    }
                }
                bookmarks{
                    id
                    user{
                        id
                        username
                        fullname
                    }
                }
             }
            }`
        })
        return post[0];
       }
   )
}
export {usePostBySlug};