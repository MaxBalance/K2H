angular.module('services.search',[])
    .factory('SearchService',['$http','Search',
        function ($http,Search) {

            var service = {
                fuzzy_search: function (params) {
                    return Search.puzzy_search(params).$promise.then(function(res) {
                        return res;
                    });
                },
                exact_search:function (params) {
                    return Search.exact_search(params).$promise.then(function(res) {
                        return res;
                    });
                }
            };
            return service;
    }])