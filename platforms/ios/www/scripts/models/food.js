/**
 * Created by yanhao on 15/3/19.
 */
angular.module('models.food',['constants']).factory('Food',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        list:{
            method: API.Method.GET,
            url: API.ResourceBase + "Food/foodByA"
        },
        info:{
            method: API.Method.GET,
            url: API.ResourceBase + "Food/foodInfo"
        },
        collect:{
            method: API.Method.GET,
            url: API.ResourceBase + "Collect/addCollect"
        },
        saveMenu: {
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/addMenu"
        },
        getTag:{
            method:API.Method.GET,
            url:API.ResourceBase + "Sys/allTag"
        }

    });
    return resource;
}]);