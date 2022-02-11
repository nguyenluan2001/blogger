const { strapi } = require("utils/strapi")

const filterTags = async(filter) => {
    try{
        const tags = await strapi.find(`tags/filterTags?filter=${filter}`)
        return tags;
    } catch(error) {
        return {
            message: error?.message
        };
    }
}
export {filterTags};