angular.module('K2H.app')
    .controller('restaurantListController',
    ['$scope','$state','RestaurantListService','$ionicPopover','Ds',
        function($scope, $state, RestaurantListService,$ionicPopover,Ds){

            var  sortList = function (type) {
                RestaurantListService.restaurantList({lon:1,lat:1,uid:Ds.get('userid'),orderType:type}).then(function(res){

                    if(res.code == 0){
                        $scope.restaurantList = res.data.rows;
                    }

                    console.log(res);
                }).catch(function(err){
                    console.log(err);
                });
            }
            sortList(1);

            $scope.details = function (restaurant) {
                $state.go('menu.pu.restaurantDetail',{'rid':restaurant.id})
            }

            $ionicPopover.fromTemplateUrl('restaurant_sort.html',{
                scope:$scope
            }).then(function (popover) {
                $scope.popover = popover;
            })

            $scope.showPop = function ($event) {
               $scope.popover.show($event);
            }

            $scope.sort = function (type) {
                sortList(type);
                $scope.popover.hide();
            }
        }
    ])
;
