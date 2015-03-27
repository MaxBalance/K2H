angular.module('services.notification',[])
    .factory('NotificationService',['$http','Notification',
        function ($http, Notification) {
            var service = {
                getNotification: function (params) {
                    return Notification.getNotification(params).$promise.then(function (res) {
                        return res;
                    })
                },
                readNotification: function (params) {
                    return Notification.readNotification(params).$promise.then(function (res) {
                        return res;
                    })
                }
            }
            return service;
    }])