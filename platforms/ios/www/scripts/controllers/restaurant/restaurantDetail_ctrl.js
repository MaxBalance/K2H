angular.module('K2H.app')
    .controller('restaurantDetailController',
    ['$scope','$state','$stateParams','$ionicPopup','RestaurantDetailService','$ionicSlideBoxDelegate','Ds','FoodService',
        function($scope, $state, $stateParams,$ionicPopup,RestaurantDetailService,$ionicSlideBoxDelegate,Ds,FoodService){
            var userid = Ds.get('userid');
            Ds.set('rid',$state.params.rid);
            //餐厅详情
            RestaurantDetailService.restaurantDetail({rid:$state.params.rid,uid:userid}).then(function(res){
                if(res.code == 0){
                    $scope.restaurant_Detail = res.data.restaurant[0];
                    var data = res.data.foods;

                    var foodList = new Array();
                    for(var i=0; i<data.length;i++){
                      var foods = {};
                      foods.big = data[i][0];
                      var foodss = data[i];
                      var sm = new Array();
                      for(var j=0; j<foodss.length;j++){
                      if(j!=0){
                      sm.push(foodss[j]);
                      }
                           }
                      foods.sm=sm;
                      foodList.push(foods);
                    }

                    $scope.foodList = foodList;
                    console.log($scope.restaurant_Detail);
                    console.log(foodList);
                    $ionicSlideBoxDelegate.update();
                }
            }).catch(function(err){
                console.log(err);
            });

            //点赞
            $scope.addPraise = function (){
                RestaurantDetailService.addPraise({uid:userid,pid:Ds.get('rid'),flag:1}).then(function(res){
                    $scope.restaurant_Detail.dz_flag = ($scope.restaurant_Detail.dz_flag == 1)?0:1;
                    $scope.restaurant_Detail.dz_cnt = ($scope.restaurant_Detail.dz_flag == 0)?(parseInt($scope.restaurant_Detail.dz_cnt) - 1):(parseInt($scope.restaurant_Detail.dz_cnt) + 1);
                }).catch(function(err){
                    console.log(err);
                });
            }

            //加入收藏
            $scope.addCollect = function (){
                RestaurantDetailService.addCollect({uid:userid,wid:Ds.get('rid'),flag:1}).then(function(res){
                    $scope.restaurant_Detail.sc_flag = ($scope.restaurant_Detail.sc_flag == 1)?0:1;
                    $scope.restaurant_Detail.sc_cnt = ($scope.restaurant_Detail.sc_flag == 0)?(parseInt($scope.restaurant_Detail.sc_cnt) - 1):(parseInt($scope.restaurant_Detail.sc_cnt) + 1);
                }).catch(function(err){
                    console.log(err);
                });
            }

            //商品详情
            $scope.foodDetail = function (fid) {
                $state.go('food',{fid:fid})
            };


            var flag = false;

            $scope.Style = function(){

                if(!flag){
                    $scope.btn1 = "imgBtn1Open";
                    $scope.btn2 = "imgBtn2Open";
                    $scope.btn3 = "imgBtn3Open";
                    flag = true;
                }else{
                    $scope.btn1 = "imgBtn1Close";
                    $scope.btn2 = "imgBtn2Close";
                    $scope.btn3 = "imgBtn3Close";
                    flag = false;
                }
            }

            //加入菜单
            $scope.addMenu = function(food){
                console.log(food);
                FoodService.saveMenu({fid:food.id,uid:userid}).then(function(res){
                    Ds.set('rid',$state.params.rid);
                    if(res.code != 0){
                        $ionicPopup.alert({
                            title: res.msg,
                            okType:'button-balanced',
                            okText:'确定'
                        });
                        return;
                    }
                    food.cd_flag =1;
                }).catch(function(err){
                    console.log(err);
                });
            };

            //已加入菜单
            $scope.addMenued = function(){
                $ionicPopup.alert({
                    title: '已加入菜单!',
                    okType:'button-balanced',
                    okText:'确定'
                }).catch(function(err){
                    console.log(err);
                });
            };

            //查看全景
            $scope.overallView = function (){
                $state.go('menu.pu.overallView');
            }

            //我的菜单
            $scope.myMenu = function (){
                $state.go('menu.pu.newMenu');
            }

            $scope.goRecommend = function (detail) {
                $state.go('menu.pu.recommend',{'rid':detail.id})
            }
        }
    ])
;