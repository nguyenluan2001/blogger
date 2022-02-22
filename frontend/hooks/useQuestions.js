import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const useQuestions = ({query}) => {
   return useQuery(
       ["useQuestions", query], async () => {
        let questions = await strapi.find("questions", query);
        return questions;
       
    })
}
export {useQuestions};