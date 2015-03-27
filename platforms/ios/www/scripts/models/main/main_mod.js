angular.module('models.main',['constants'])
    .factory('Main',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        main:{
            method: API.Method.GET,
            url: API.ResourceBase + "Sys/door"
        },
        about:{
            method: API.Method.GET,
            url: API.ResourceBase + "Sys/version"
        },
        opinion:{
            method: API.Method.GET,
            url: API.ResourceBase + "Sys/opinion"
        }

    });
    return resource;
}]);