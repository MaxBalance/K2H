angular.module('services.main',[])
    .factory('MainService', ['$http', 'Main', '$rootScope',
    function ($http, Main, $rootScope) {

        var service = {
            main: function(params){
                return Main.main(params).$promise.then(function(res){
                    return res;
                });
            },
            about: function(params){
                return Main.about(params).$promise.then(function(res){
                    return res;
                });
            },
            opinion: function(params){
                return Main.opinion(params).$promise.then(function(res){
                    return res;
                });
            }
        };

        return service;

    }
]);