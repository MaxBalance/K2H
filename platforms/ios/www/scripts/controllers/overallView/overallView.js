/**
 * Created by Jack on 15/3/24.
 */
angular.module('K2H.app')
    .controller('OverallViewCtrl',
    ['$scope','$state','Ds','RestaurantDetailService','$sce',
        function($scope,$state,Ds,RestaurantDetailService, $sce){
            //餐厅详情
            RestaurantDetailService.restaurantDetail({rid:Ds.get('rid'),uid:Ds.get('userid')}).then(function(res){
                if(res.code == 0){
                    $scope.trustSrc = $sce.trustAsResourceUrl(res.data.restaurant[0].panorama);
                }
            }).catch(function(err){
                console.log(err);
            });

        }]);