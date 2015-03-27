/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
    .controller('saveInvoiceController',
    ['$scope','$ionicPopup','$state','TicketsService','Ds',
        function($scope,$ionicPopup,$state,TicketsService,Ds){
            var userid = Ds.get('userid');
            var flag;

            $scope.invalid = false;
            $scope.ticket = $state.params;
            if($scope.ticket.invoice_title){
                $scope.title = '编辑发票';
                flag = false;
            }else{
                $scope.title = '新增发票';
                flag = true;
            }

            //新增发票抬头 By Jack
            $scope.saveInvoice = function(){
                if($scope.ticket == undefined){
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的信息!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if(!$scope.ticket.invoice_title){
                    var alertPopup = $ionicPopup.alert({
                        title:'还没写您的发票抬头!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                $scope.invalid = true;

                if(flag){
                    TicketsService.add({uid:userid,invoice_title:$scope.ticket.invoice_title}).then(
                        function(data){
                            if(data.code ==0) {
                                var alertPopup = $ionicPopup.alert({
                                    title:'新增发票成功!',
                                    okType:'button-balanced',
                                    okText:'确定'
                                });
                                alertPopup.then(function(res) {
                                    $state.go('menu.receipt');});
                            }
                        }
                    ).catch(function(e){console.log(e);});
                }else{
                    TicketsService.update({uid:$scope.ticket.uid,ui_id:$scope.ticket.id,invoice_title:$scope.ticket.invoice_title}).then(
                        function(data){
                            if(data.code ==0) {
                                var alertPopup = $ionicPopup.alert({
                                    title:'修改发票成功!',
                                    okType:'button-balanced',
                                    okText:'确定'
                                });
                                alertPopup.then(function(res) {
                                    $state.go('menu.receipt');});
                            }
                        }
                    ).catch(function(e){console.log(e);});
                }

            }

        }]);