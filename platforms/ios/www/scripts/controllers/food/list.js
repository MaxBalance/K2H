angular.module('K2H.app').controller('foodListController',
    ['$scope', '$state', '$ionicModal','FoodService','$ionicPopover','$stateParams','Ds',
    function($scope, $state, $ionicModal, FoodService,$ionicPopover,$stateParams,Ds){
        if($stateParams.tid){
            var tid = $stateParams.tid;
            $scope.title = $stateParams.title;
            $scope.tag = false;
        }else{
            var tid = [];
            $scope.title = '附近美食';
            $scope.tag = true;
        }
        //总列表
        var sortFood = function (tid) {
            FoodService.list({uid:Ds.get('userid'),lon:1,lat:1,tid:tid}).then(function(res){
                if(res.code == 0){
                    $scope.foods = res.data.rows;
                }
            }).catch(function(err){
                console.log(err);
            });
        }
        sortFood(tid);

        //详细信息
        $scope.FoodInfo = function(id,rid){
           $state.go('food', {fid:id,rid:rid});
        }

        //勾选
        $scope.select = function (food) {
            if(food.checked){
                tid.push(food.id)
            }else{
                for (var i=0;i<tid.length;i++){
                    if(tid[i] == food.id){
                        tid.splice(i,1);
                    }
                }
            }
            var tids = tid.toString();
            sortFood(tids);
        }

        //菜品列表
        FoodService.getTag().then(function(res){
            if(res.code == 0){
                $scope.foodList = res.data.rows;
            }
            console.log(res);
        }).catch(function(err){
            console.log(err);
        });


        $ionicPopover.fromTemplateUrl('food_sort.html',{
            scope:$scope
        }).then(function (popover) {
            $scope.popover = popover;
        })

        $scope.showPop = function ($event) {
            $scope.popover.show($event);
        }
    }
]);