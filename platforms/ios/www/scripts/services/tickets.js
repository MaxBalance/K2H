/**
 * Created by Jack on 15/3/18.
 */
angular.module('services.tickets', []).factory('TicketsService', ['$http', 'Tickets', '$q', '$rootScope',
    function ($http, Tickets, $q, $rootScope) {

        var TicketsService = {
            all: function(params){
                return Tickets.all(params).$promise.then(function(res){
                    return res;
                });
            },
            remove:function(params){
                return Tickets.remove(params).$promise.then(function(res){
                    return res;
                });
            },
            add:function(params){
                return Tickets.add(params).$promise.then(function(res){
                    return res;
                });
            },
            update:function(params){
                return Tickets.update(params).$promise.then(function(res){
                    return res;
                });
            }

        };


        return TicketsService;

    }
]);