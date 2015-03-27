angular.module('models.restaurantList',[])
    .factory('RestaurantList',['$resource', "API", function($resource, API){

        var targetBase  = API.ResourceBase;

        var resource = $resource(targetBase, {}, {

            restaurantList:{
                method: API.Method.GET,
                url: API.ResourceBase + "Restaurant/restList"
            }

        });
        return resource;
}]);