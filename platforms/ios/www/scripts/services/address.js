/**
 * Created by Jack on 15/3/18.
 */
angular.module('services.address', []).factory('AddressService', ['$http', 'Address', '$q', '$rootScope',
    function ($http, Address, $q, $rootScope) {

        var AddressService = {
            all: function(params){
                return Address.all(params).$promise.then(function(res){
                    return res;
                });
            },
            remove:function(params){
                return Address.remove(params).$promise.then(function(res){
                    return res;
                });
            },
            add:function(params){
                return Address.add(params).$promise.then(function(res){
                    return res;
                });
            },
            update:function(params){
                return Address.update(params).$promise.then(function(res){
                    return res;
                });
            }

        };


        return AddressService;

    }
]);