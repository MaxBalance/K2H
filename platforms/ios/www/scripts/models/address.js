/**
 * Created by Jack on 15/3/18.
 */
angular.module('models.address',['constants']).factory('Address',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        all:{
            method: API.Method.GET,
            url: API.ResourceBase + "Address/myAddress"
        },
        remove:{
            method: API.Method.GET,
            url: API.ResourceBase + "Address/delAddress"
        },
        add:{
            method: API.Method.GET,
            url: API.ResourceBase + "Address/addAddress"
        },
        update:{
            method: API.Method.GET,
            url: API.ResourceBase + "Address/editAddress"
        }

    });
    return resource;
}]);