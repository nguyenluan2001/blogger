import { strapi } from "../utils/strapi"
import { useQuery } from "react-query"
const useTagBySlug = ({ tag_slug, query }) => {
    return useQuery(
        ["useTagBySlug", tag_slug], async () => {
            // let tag = await strapi.find("tags", {
            //     slug: tag_slug,
            //     ...query
            // })
            // return tag[0];
            const tag = await strapi.graphql({
                query: `query{
                tags(where:{slug: "${tag_slug}"}){
                    id
                    name
                    slug
                    posts{
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
                }
            }`
            })
            return tag[0];

        })
}
export { useTagBySlug };