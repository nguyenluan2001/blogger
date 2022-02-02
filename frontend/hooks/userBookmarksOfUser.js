import {strapi} from "../utils/strapi"
import {useQuery} from "react-query"
const userBookmarksOfUser = ({username}) => {
   return useQuery(
       ["userBookmarksOfUser", username], async () => {
        let bookmarks = await strapi.find("bookmarks", {
            'user.username': username
        });
        return bookmarks;
       
    })
}
export {userBookmarksOfUser};