/**
 * Created by Jack on 15/3/19.
 */
angular.module('models.login',['constants']).factory('Login',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        uniteLogin:{
            method: API.Method.GET,
            url: API.ResourceBase + "User/uniteLogin"
        },
        randomLogin:{
            method: API.Method.GET,
            url: API.ResourceBase + "User/randomLogin"
        }

    });
    return resource;
}]);