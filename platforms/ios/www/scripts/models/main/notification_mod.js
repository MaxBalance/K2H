angular.module('models.notification',['constants'])
    .factory('Notification',['$resource','API', function ($resource,API) {

        var targetBase = API.ResourceBase;

        var resource = $resource(targetBase,{},{

            getNotification:{

                Method:API.Method.GET,
                url:API.ResourceBase + 'Message/myMessage'
            },
            readNotification:{
                Method:API.Method.GET,
                url:API.ResourceBase + 'Message/isRead'
            }
        });
        return resource;
    }])