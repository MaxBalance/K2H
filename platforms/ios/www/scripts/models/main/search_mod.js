angular.module('models.search',['constants'])
    .factory('Search',['$resource','API', function ($resource,API) {

        var targetBase = API.ResourceBase;

        var resource = $resource(targetBase,{},{

            puzzy_search:{
                method: API.Method.GET,
                url:API.ResourceBase + 'Food/foodByS'
            },
            exact_search:{
                method: API.Method.GET,
                url:API.ResourceBase + 'Food/foodByF'
            }
        })
        return resource;
    }])