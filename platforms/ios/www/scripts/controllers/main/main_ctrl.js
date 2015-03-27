angular.module('K2H.app')
    .controller('mainController',
    ['$scope','$state','$ionicSideMenuDelegate','MainService','Ds',
        function($scope, $state, $ionicSideMenuDelegate, MainService,Ds){
            //初始化menu打开方式
            //$ionicSideMenuDelegate.toggleLeft();
            // var userid;
            // if(Ds.has('userid')){
            //    userid = Ds.get('userid');
            // }else{
            //    userid = 36;
            // }
            MainService.main({lon:1,lat:1}).then(function(res){

                if(res.code == 0){
                    $scope.restaurantList = res.data.restaurant;

                    var food1 = {
                        title: res.data.food1[0].tname,
                        data: res.data.food1,
                        tid:res.data.food1[0].tid
                    };

                    var food2 = {
                        title: res.data.food2[0].tname,
                        data: res.data.food2,
                        tid:res.data.food2[0].tid
                    };

                    var food3 = {
                        title: res.data.food3[0].tname,
                        data: res.data.food3,
                        tid:res.data.food3[0].tid
                    };

                    $scope.foods = [food1, food2, food3];
                }

                console.log(res);
            }).catch(function(err){
                console.log(err);
            });

            $scope.restaurantLists = function(){
                $state.go('menu.pu.restaurantList');
            };

            $scope.restaurantDetail = function(restaurant){
                $state.go('menu.pu.restaurantDetail',{'rid':restaurant.id});
            };

            $scope.foodList = function(food) {
                if (food) {
                    $state.go('menu.pu.foodList', {tid: food.tid, title: food.title});
                } else {
                    $state.go('menu.pu.foodList');
                }
            }

            $scope.Food = function(id){
                $state.go('food',{fid:id});
            };

            //重新定位
            $scope.getPosition = function (){
                $state.go('getPosition');
            }
        }
    ])
;