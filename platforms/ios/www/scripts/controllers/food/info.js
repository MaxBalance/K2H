/**
 * Created by yanhao on 15/3/19.
 */
angular.module('K2H.app').controller('foodInfoController',['$scope', '$state','$ionicPopup', 'FoodService','Ds',
    function($scope, $state,$ionicPopup, FoodService,Ds){
       var userid = 1;
       if(Ds.has('userid')){
        userid = Ds.get('userid');
       }
        FoodService.info({fid:$state.params.fid,uid:userid,lon:1,lat:1}).then(function(res){
            console.log(res);
            if(res.code == 0){
                $scope.food =  res.data.rows[0];
                if($scope.food.sc_flag == 0)
                    $scope.collect = 'ion-ios-heart-outline';
                else
                    $scope.collect = 'ion-ios-heart';
            }
        }).catch(function(err){
            console.log(err);
        });
        $scope.Back = function(){
            history.back();
        }

        $scope.AddCollect = function(id){
            FoodService.collect({wid:id,flag:2,uid:userid}).then(function(res){
                if($scope.collect == 'ion-ios-heart-outline') {
                    $scope.collect = 'ion-ios-heart';
                }else{
                    $scope.collect = 'ion-ios-heart-outline';
                }
            }).catch(function(err){
                console.log(err);
            });

        };

        $scope.AddMenu = function(id){
            FoodService.saveMenu({fid:id,uid:userid}).then(function(res){
                Ds.set('rid',$state.params.rid);
                $ionicPopup.alert({
                    title: $scope.food.name + '加入菜单!',
                    okType:'button-balanced',
                    okText:'确定'
                });
                $scope.food.cd_flag = 1;
            }).catch(function(err){
                console.log(err);
            });
        };
    }
]);