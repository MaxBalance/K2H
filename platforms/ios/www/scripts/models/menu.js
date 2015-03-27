/**
 * Created by Jack on 15/3/18.
 */
angular.module('models.mymenu',['constants']).factory('MyMenu',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        myMenuCnt:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/myMenuCnt"
        },
        myMenu:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/myMenu"
        },
        remove:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/delMenu"
        },
        editMenu:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/editMenu"
        }

    });
    return resource;
}]);