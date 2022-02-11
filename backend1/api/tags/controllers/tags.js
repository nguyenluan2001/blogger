'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     async getPopularTags(){
         let tags = await strapi.services.tags.find();
         tags = tags.sort((pre, next) => next.posts.length - pre.posts.length ).splice(0, 15)
         return tags;
     },
     async filterTags(ctx){
         const {filter} = ctx.query
         let tags = await strapi.services.tags.find();
         switch(filter){
             case 'followers':{
                tags = tags.sort((pre, next) => next.users.length - pre.users.length).splice(0, 15)
                break;
             }
             case 'posts':{
                tags = tags.sort((pre, next) => next.posts.length - pre.posts.length ).splice(0, 15)
                break;
             }
             default:{break;}
         }
        //  console.log(filter);
         return tags;
     }
};
