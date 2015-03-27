/**
 * Created by yanhao on 15/3/19.
 */
angular.module('services.food', []).factory('FoodService', ['$http', 'Food', '$q', '$rootScope',
    function ($http, Food, $q, $rootScope) {

        var FoodService = {
            list: function(params){
                return Food.list(params).$promise.then(function(res){
                    return res;
                });
            },
            info: function(params){
                return Food.info(params).$promise.then(function(res){
                   return res;
                });
            },
            collect: function(params){
                return Food.collect(params).$promise.then(function(res){
                    return res;
                });
            },
            saveMenu: function(params){
                return Food.saveMenu(params).$promise.then(function(res){
                    return res;
                });
            },
            getTag: function (params) {
                return Food.getTag(params).$promise.then(function (res) {
                    return res;
                })
            }

        };


        return FoodService;

    }
]);