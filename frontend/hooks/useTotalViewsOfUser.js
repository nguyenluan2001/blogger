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
const usePostsByUsername = ({username}) => {
   return useQuery(
       ["usePostsByUsername", username], async () => {
        let posts = await strapi.graphql({
            query: `query {
             posts( where: { user:{username: "${username}"}}){
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
        return posts;
       }
   )
}
export {usePostsByUsername};