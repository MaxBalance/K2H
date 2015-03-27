/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
    .controller('saveAddressController',
    ['$scope','$ionicPopup','$state','AddressService','Ds',
        function($scope,$ionicPopup,$state,AddressService,Ds){
            var userid = Ds.get('userid');
            $scope.invalid = false;
            $scope.address = $state.params;
            console.log($state.params);
            var flag;

            if($scope.address.id){
                $scope.title = '编辑地址';
                flag = false;
            }else{
                $scope.title = '新增地址';
                flag = true;
            }

            //新增地址 By Jack
            $scope.postAdd = function(){
                if($scope.address == undefined){
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的信息!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if(!$scope.address.to_name){
                    var alertPopup = $ionicPopup.alert({
                        title:'还没写收件人的姓名!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if (!/^1\d{10}$/.test($scope.address.to_phone)) {
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的手机号!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if(!$scope.address.to_addr){
                    var alertPopup = $ionicPopup.alert({
                        title:'还没写收件人的收货地址!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                $scope.invalid = true;
                if(flag){
                    AddressService.add({uid:userid,to_name:$scope.address.to_name,to_addr:$scope.address.to_addr,to_phone:$scope.address.to_phone,to_lon:1,to_lat:1}).then(
                        function(data){
                            if(data.code ==0) {
                                var alertPopup = $ionicPopup.alert({
                                    title:'新增地址成功!',
                                    okType:'button-balanced',
                                    okText:'确定'
                                });
                                alertPopup.then(function(res) {
                                    $state.go('menu.address');});
                            }
                        }
                    ).catch(function(e){console.log(e);});
                }else{
                    AddressService.update({uid:$scope.address.uid,id:$scope.address.id,to_name:$scope.address.to_name,to_addr:$scope.address.to_addr,to_phone:$scope.address.to_phone,to_lon:1,to_lat:1}).then(
                        function(data){
                            if(data.code ==0) {
                                var alertPopup = $ionicPopup.alert({
                                    title:'修改地址成功!',
                                    okType:'button-balanced',
                                    okText:'确定'
                                });
                                alertPopup.then(function(res) {
                                    $state.go('menu.address');});
                            }
                        }
                    ).catch(function(e){console.log(e);});
                }

            }

        }]);