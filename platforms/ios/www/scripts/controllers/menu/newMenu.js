/**
 * Created by Jack on 15/3/23.
 */
angular.module('K2H.app')
    .controller('newMenuController',
    ['$scope','$ionicLoading','$state','$ionicModal','$ionicPopup','MyMenuService','OrderService','Ds',
        function($scope,$ionicLoading,$state,$ionicModal,$ionicPopup,MyMenuService,OrderService,Ds){
            //var lon = Ds.get('Longitude');
            //var lat = Ds.get('Latitude');
            var userid = 1;
            if(Ds.has('userid')){
                userid = Ds.get('userid');
            }

//            $ionicLoading.show({template: '加载中...'});

            //查询我的菜单
            if(Ds.has('rid')){
                var rid = Ds.get('rid');
                MyMenuService.myMenu({uid:userid,rid:rid}).then(
                    function (data){
                        $scope.myMenu = data.data;
                        console.log($scope.myMenu);
                        //                    $ionicLoading.hide();
                    }
                ).catch(function(e){console.log(e);});
            }

            //删除菜单
            $scope.remove = function(menu) {
                $scope.myMenu.rows.splice($scope.myMenu.rows.indexOf(menu), 1);
                MyMenuService.remove({uid:userid,fid:menu.fid});
            }

            //菜单减号
            $scope.shopCnt_minus = function(menu) {
                if(menu.shop_cnt <= 1){
                    $ionicPopup.show({
                        //template: '<input type="text" style="text-align: center " ng-model="data.foodCount" >',
                        title: '删除菜品',
                        subTitle: '是否删除该菜品？',
                        scope: $scope,
                        buttons: [
                            { text: '取消' },
                            {
                                text: '<b>确认</b>',
                                type: 'button-positive',
                                onTap: function() {
                                    event.stopPropagation();
                                    $scope.remove(menu);
                                }
                            }
                        ]
                    });
                }else{
                    menu.shop_cnt = parseInt(menu.shop_cnt) - 1;
                    $scope.myMenu.amount = parseInt($scope.myMenu.amount) - parseInt(menu.price);
                }
                event.stopPropagation();
            }

            //菜单加号
            $scope.shopCnt_plus = function(menu) {
                menu.shop_cnt = parseInt(menu.shop_cnt) + 1;
                $scope.myMenu.amount = parseInt($scope.myMenu.amount) + parseInt(menu.price);
                event.stopPropagation();
            }

            //查看商品详情
            $scope.FoodInfo = function(id){
                $scope.editMenu();
                $state.go('food', {fid:id});
            }

            //更改菜品数量
            $scope.editMenu = function() {
                var fids = '';
                var cnts = '';
                for(var i=0; i<$scope.myMenu.rows.length ;i++){
                    fids = fids + $scope.myMenu.rows[i].fid + ',';
                    cnts = cnts + $scope.myMenu.rows[i].shop_cnt + ',';
                }
                fids = fids.substr(0,fids.length - 1);
                cnts = cnts.substr(0,cnts.length - 1);
                MyMenuService.editMenu({uid:userid,rid:rid,fids:fids,cnts:cnts});
            }

            //买单
            $scope.order = function(){
                if(parseInt($scope.myMenu.amount) < $scope.myMenu.sendprice){
                    $ionicPopup.alert({
                        title: '本店'+ $scope.myMenu.sendprice +'起送!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                $scope.editMenu();
                $state.go('menu.pu.pay' , $scope.myMenu);
            }

        }]);