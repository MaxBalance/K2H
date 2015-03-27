angular.module('services.restaurantList',[])
    .factory('RestaurantListService', ['$http', 'RestaurantList', '$rootScope',
    function ($http, RestaurantList, $rootScope) {

        var service = {
            restaurantList: function(params){
                return RestaurantList.restaurantList(params).$promise.then(function(res){
                    return res;
                });
            }
        };

        return service;

    }
]);