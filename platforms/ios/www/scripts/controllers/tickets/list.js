/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
        .controller('ticketsListController',
        ['$scope','$ionicLoading','$state','TicketsService','Ds',
            function($scope,$ionicLoading,$state,TicketsService,Ds){

                var userid = Ds.get('userid');
//                var userid = 114;
                //没有网会一直加载，不能返回
//                $ionicLoading.show({template: '加载中...'});
                TicketsService.all({uid:userid}).then(
                    function(data){
                        $scope.tickets = data.data.rows;
                        for(var o in $scope.tickets){
                            $scope.tickets[o].create_date = getOrderTime($scope.tickets[o].create_date);
                        }
//                        $ionicLoading.hide();
                    }
                ).catch(function(e){console.log(e);});

                ////新增发票
                //$scope.addInvoice = function (flag){
                //    $state.go('menu.pu.addInvoice', flag);
                //}
                //
                ////编辑发票
                //$scope.update = function (ticket,flag){
                //    $state.go('menu.pu.updateInvoice', ticket , flag);
                //}

                //新增发票
                $scope.addInvoice = function (){
                    $state.go('menu.pu.saveInvoice' );
                }

                //编辑发票
                $scope.update = function (ticket){
                    $state.go('menu.pu.saveInvoice', ticket );
                }

                //删除发票
                $scope.remove = function(ticket) {
                    $scope.tickets.splice($scope.tickets.indexOf(ticket), 1);
                    TicketsService.remove({uid:userid,ui_id:ticket.id});
                }

            }
    ])
;