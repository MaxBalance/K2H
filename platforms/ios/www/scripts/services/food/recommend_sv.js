angular.module('services.recommend',[])
    .factory('RecommendService', ['$http', 'Recommend', '$rootScope',
        function ($http, Recommend, $rootScope) {

            var service = {
                typeList: function(params){
                    return Recommend.typeList(params).$promise.then(function(res){
                        return res;
                    });
                },
                foodList: function(params){
                    return Recommend.foodList(params).$promise.then(function(res){
                        return res;
                    });
                }
            };

            return service;

        }
    ]);