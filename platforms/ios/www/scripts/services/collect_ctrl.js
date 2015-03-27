angular.module('services.collect',[])
    .factory('CollectService', ['$http', 'Collect', '$rootScope',
        function ($http, Collect, $rootScope) {

            var service = {
                myCollect: function(params){
                    return Collect.myCollect(params).$promise.then(function(res){
                        return res;
                    });
                }
            };

            return service;

        }
    ]);