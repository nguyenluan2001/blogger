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
const useQuestionBySlug = (question_slug) => {
   return useQuery(
       ["useQuestionBySlug", question_slug], async () => {
        let question = await strapi.graphql({
            query: `query {
             questions( where: { slug: "${question_slug}"}){
                id
                title
                content
                slug
                votes
                owner{
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
                    slug
                }
                replies{
                    id
                    content
                    user{
                        id
                        username
                    }
                    created_at
                }
                bookmark_users{
                    id
                }
             }
            }`
        })
        return question[0];
       }
   )
}
export {useQuestionBySlug};