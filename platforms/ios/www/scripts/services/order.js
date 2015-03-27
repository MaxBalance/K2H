/**
 * Created by Jack on 15/3/18.
 */
angular.module('services.order', []).factory('OrderService', ['$http', 'Order', '$q', '$rootScope',
    function ($http, Order, $q, $rootScope) {

        var MyMenuService = {
            postOrder: function(params){
                return Order.postOrder(params).$promise.then(function(res){
                    return res;
                });
            },
            menuByDfk:function(params){
                return Order.menuByDfk(params).$promise.then(function(res){
                    return res;
                });
            },
            menuByDfkInfo:function(params){
                return Order.menuByDfkInfo(params).$promise.then(function(res){
                    return res;
                });
            },
            cancle:function(params){
                return Order.cancle(params).$promise.then(function(res){
                    return res;
                });
            },
            menuByYfk:function(params){
                return Order.menuByYfk(params).$promise.then(function(res){
                    return res;
                });
            },
            menuByYpj:function(params){
                return Order.menuByYpj(params).$promise.then(function(res){
                    return res;
                });
            },
            addOrderComment:function(params){
                return Order.addOrderComment(params).$promise.then(function(res){
                    return res;
                });
            }

        };


        return MyMenuService;

    }
]);