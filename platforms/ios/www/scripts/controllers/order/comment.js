/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
    .controller('commentController',
    ['$scope','$state','OrderService','Ds',
        function($scope,$state,OrderService,Ds){
            var userid = Ds.get('userid');
            $scope.order_no = $state.params;
            $scope.pjwd = 5;
            $scope.pjfw = 5;
            $scope.pjkd = 5;

            $scope.postPj = function (pjInfocontent){
                if(!pjInfocontent){
                    $ionicPopup.alert({
                        title:'评价内容不能为空!',
                        okType:'button-balanced',
                        okText:'确认'
                    });
                    return false;
                }
                OrderService.addOrderComment({flag:1,uid:userid,orderno:$scope.order_no,logi_lev:$scope.pjkd,desc_lev:$scope.pjwd,serv_lev:$scope.pjfw,content:pjInfocontent}).then(
                    function (data){
                        if(data.code == 0){
                            $ionicPopup.alert({
                                title:'评价成功!',
                                okType:'button-balanced',
                                okText:'确认'
                            }).then(function (){
                                    history.go(-1);
                            });
                        }

                    }
                );
            }
            $scope.$on('order.addOrderComment',function($event,code){
                Menu.myMenuCnt(userid);
                Order.menuByYfk(userid,1,1);
                if($scope.pjOrderModal){
                    $scope.pjOrderModal.remove();
                }
                if(code ==0) {
                    var alertPopup = $ionicPopup.alert({
                        title:'订单评价成功!',
                        okType:'button-balanced'
                    });
                }
            });

        }]);
