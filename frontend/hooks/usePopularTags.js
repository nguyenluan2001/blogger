import { strapi } from "../utils/strapi"
import { useQuery } from "react-query"
const usePopularTags = () => {
    return useQuery(
        ["usePopularTags"], async () => {
            // let tag = await strapi.find("tags", {
            //     slug: tag_slug,
            //     ...query
            // })
            // return tag[0];
            const tags = await strapi.find('tags/popular')
            return tags;
          
        })
}
export { usePopularTags };