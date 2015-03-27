angular.module('services.restaurantDetail', [])
    .factory('RestaurantDetailService', ['$http', 'RestaurantDetail', '$rootScope',
        function ($http, RestaurantDetail, $rootScope) {

            var service = {
                restaurantDetail : function(params){
                    return RestaurantDetail.restaurantDetail(params).$promise.then(function(res){
                        return res;
                    });
                },
                addPraise : function(params){
                    return RestaurantDetail.addPraise(params).$promise.then(function(res){
                        return res;
                    });
                },
                addCollect : function(params){
                    return RestaurantDetail.addCollect(params).$promise.then(function(res){
                        return res;
                    });
                }
            };

            return service;

        }
    ]);