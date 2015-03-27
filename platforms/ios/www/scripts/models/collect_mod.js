angular.module('models.collect',['constants'])
    .factory('Collect',['$resource', "API", function($resource, API){

        var targetBase  = API.ResourceBase;

        var resource = $resource(targetBase, {}, {

            myCollect:{
                method: API.Method.GET,
                url: API.ResourceBase + "Collect/myCollect"
            }

        });
        return resource;
    }]);