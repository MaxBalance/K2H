/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
        .controller('addressListController',
        ['$scope','$ionicLoading','$state','AddressService','Ds',
            function($scope,$ionicLoading,$state,AddressService,Ds){
                //$scope.flag = $state.flag;

                var userid = Ds.get('userid');
                //没有网会一直加载，不能返回
//                $ionicLoading.show({template: '加载中...'});
                AddressService.all({uid:userid}).then(
                    function(data){
                        $scope.addresses = data.data.rows;
//                        $ionicLoading.hide();
                    }
                ).catch(function(e){console.log(e);});

                //新增地址
                $scope.add = function (){
                    $state.go('menu.pu.saveAddress');
                }

                //编辑地址
                $scope.update = function (address){
                    $state.go('menu.pu.saveAddress', address);
                }

                //删除地址
                $scope.remove = function(address) {
                    $scope.addresses.splice($scope.addresses.indexOf(address), 1);
                    AddressService.remove({uid:address.uid,aid:address.id});
                }

                //$scope.select = function(address){
                //    $state.go('menu.pu.pay', address);
                //}

            }
    ])
;