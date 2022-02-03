import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const useUniversities = () => {
   return useQuery(
       ["useUniversities"], async () => {
        let universities = await strapi.find("universities")
        return universities;
       
    })
}
export {useUniversities};