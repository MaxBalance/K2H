/**
 * Created by Jack on 15/3/24.
 */
angular.module('K2H.app')
    .controller('myOrderController',
    ['$scope','$ionicLoading','$state','$ionicModal','MyMenuService','OrderService','Ds',
        function($scope,$ionicLoading,$state,$ionicModal,MyMenuService,OrderService,Ds){
            //var lon = Ds.get('Longitude');
            //var lat = Ds.get('Latitude');
            var userid = Ds.get('userid');
//            userid = 20;
//            $ionicLoading.show({template: '加载中...'});
            $scope.cnt = {cnt1:0,cnt2:0,cnt3:0,cnt4:0};

            //查询我的菜单
            if(Ds.has('rid')){
                var rid = Ds.get('rid');
                //查询myMenuCnt
                MyMenuService.myMenuCnt({uid:userid,rid:rid}).then(
                    function (data){
                        $scope.cnt = data.data.rows;
                    }
                ).catch(function(e){console.log(e);});
                //MyMenuService.myMenu({uid:userid,rid:rid}).then(
                //    function (data){
                //        $scope.myMenu = data.data;
                //        //                    $ionicLoading.hide();
                //    }
                //).catch(function(e){console.log(e);});
            }

            ////查看商品详情
            //$scope.FoodInfo = function(id){
            //    $state.go('food', {fid:id});
            //}

            //查询待付款订单
            OrderService.menuByDfk({uid:userid,lon:1,lat:1}).then(
                function (data){
                    $scope.menuByDfks = data.data.rows;
                    for(var o in $scope.menuByDfks){
                        $scope.menuByDfks[o].create_date = getOrderTime($scope.menuByDfks[o].create_date);
                    }
                }
            ).catch(function(e){console.log(e);});

            //取消订单
            $scope.cancleOrder = function(dfkOrder) {
                $scope.menuByDfks.splice($scope.menuByDfks.indexOf(ticket), 1);
                OrderService.cancle({uid:userid,orderno:dfkOrder.orderno});
            }

            //订单详情页面
            $scope.menuDetialInfo = function (dfkInfo){
                OrderService.menuByDfkInfo({uid:userid,orderno:dfkInfo.orderno,lon:1,lat:1}).then(
                    function(data){
                        $scope.dfkInfos = data.data.rows;
                        $scope.orderInfo = data.data.info[0];
                        console.log(data);
                    }
                ).catch(function(e){console.log(e);});
                $ionicModal.fromTemplateUrl('menuByDfkInfo.html', {
                    scope: $scope,
                    animation: 'slide-in-left'
                }).then(function(modal) {
                    $scope.menuByDfkInfoModal = modal;
                    $scope.menuByDfkInfoModal.show();
                });
            }
            $scope.menuByDfkInfo_back = function(){
                $scope.dfkInfos = '';
                $scope.menuByDfkInfoModal.remove();
            }

            //查询已付款订单
            OrderService.menuByYfk({uid:userid,lon:1,lat:1}).then(
                function (data){
                    $scope.menuByYfks = data.data.rows;
                    for(var o in $scope.menuByYfks){
                        switch ($scope.menuByYfks[o].status){
                            case '1':
                                $scope.menuByYfks[o].status = "订单取消";
                            case '1000':
                                $scope.menuByYfks[o].status = "订单创建";
                            case '2000':
                                $scope.menuByYfks[o].status = "已付款，待烹饪";
                            case '3000':
                                $scope.menuByYfks[o].status = "烹饪开始";
                            case '4000':
                                $scope.menuByYfks[o].status = "烹饪结束";
                            case '5000':
                                $scope.menuByYfks[o].status = "派送中";
                            case '6000':
                                $scope.menuByYfks[o].status = "已签收";
                            case '7000':
                                $scope.menuByYfks[o].status = "已评价";
                        }
                        $scope.menuByYfks[o].create_date = getOrderTime($scope.menuByYfks[o].create_date);
                    }
                }
            ).catch(function(e){console.log(e);});

            //查询已评价订单
            OrderService.menuByYpj({uid:userid,lon:1,lat:1}).then(
                function (data){
                    $scope.menuByYpjs = data.data.rows;
                    for(var o in $scope.menuByYpjs){
                        $scope.menuByYpjs[o].create_date = getOrderTime($scope.menuByYpjs[o].create_date);
                    }
                }
            ).catch(function(e){console.log(e);});

            $scope.listPanel = {top: '95px'};

            //买单
            $scope.order = function(){
                $state.go('menu.pu.pay' , $scope.myMenu);
            }

            //付款
            $scope.payOrder = function (menuByDfk){
                YFPay.alipay(function(){alert('ok');},
                    function(){alert('error');},
                    [menuByDfk.orderno,//订单号
                        'YFPay',//支付subject
                        'YFPay',//支付body
                        '0.01']//金额
                );
            }

            //评价
            $scope.pjOrder = function (menuByYfk){
                var orderno = menuByYfk.orderno;
                $state.go('menu.pu.comment' , {orderno:orderno});
            }

        }]);