angular.module('K2H.app')
    .controller('notificationController',['$scope','NotificationService','$state','Ds','$ionicModal',
    function ($scope,NotificationService,$state,Ds,$ionicModal) {
        var init = function(){
            NotificationService.getNotification({uid:Ds.get('userid')}).then(function (res) {
                if(res.code == 0){
                    $scope.messageList = res.data.rows;
                }
            })
        }
        init();


        //跳转至消息详情
        $scope.msg_detail = function (message) {
            $scope.modal.show();
            $scope.msg_details = message;

            //更改已读状态
            NotificationService.readNotification({uid:Ds.get('userid'),id:message.id});
        }

        $ionicModal.fromTemplateUrl('msg_detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.back = function () {
            $scope.modal.hide();
        }

        $scope.$on('modal.hidden', function () {
            init();
        })
    }])
