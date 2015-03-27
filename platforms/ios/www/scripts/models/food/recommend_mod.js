angular.module('models.recommend',['constants'])
    .factory('Recommend',['$resource', "API", function($resource, API){

        var targetBase  = API.ResourceBase;

        var resource = $resource(targetBase, {}, {

            typeList:{
                method: API.Method.GET,
                url: API.ResourceBase + "Menu/allTag"
            },
            foodList:{
                method: API.Method.GET,
                url: API.ResourceBase + "Menu/recommend"
            }

        });
        return resource;
    }]);