angular.module('models.restaurantDetail',[])
    .factory('RestaurantDetail',['$resource', "API", function($resource, API){

        var targetBase  = API.ResourceBase;

        var resource = $resource(targetBase, {}, {
            restaurantDetail:{
                method:API.Method.GET,
                url:API.ResourceBase + "Food/foodByR"
            },
            addPraise:{
                method:API.Method.GET,
                url:API.ResourceBase + "Praise/addPraise"
            },
            addCollect:{
                method:API.Method.GET,
                url:API.ResourceBase + "Collect/addCollect"
            }
        });
        return resource;
    }]);