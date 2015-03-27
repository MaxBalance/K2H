/**
 * Created by Jack on 15/3/18.
 */
angular.module('services.mymenu', []).factory('MyMenuService', ['$http', 'MyMenu', '$q', '$rootScope',
    function ($http, MyMenu, $q, $rootScope) {

        var MyMenuService = {
            myMenuCnt: function(params){
                return MyMenu.myMenuCnt(params).$promise.then(function(res){
                    return res;
                });
            },
            myMenu:function(params){
                return MyMenu.myMenu(params).$promise.then(function(res){
                    return res;
                });
            },
            remove:function(params){
                return MyMenu.remove(params).$promise.then(function(res){
                    return res;
                });
            },
            editMenu:function(params){
                return MyMenu.editMenu(params).$promise.then(function(res){
                    return res;
                });
            }

        };


        return MyMenuService;

    }
]);