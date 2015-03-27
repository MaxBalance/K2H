/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
    .controller('orderInfoController',
    ['$scope','$ionicLoading','$state','OrderService','Ds',
        function($scope,$ionicLoading,$state,OrderService,Ds){

//            var userid = 114;
     var userid = Ds.get('userid');
            $scope.orderInfo = $state.params;
            console.log($scope.orderInfo);
            订单详情页面
            OrderService.menuByDfkInfo({uid:userid,orderno:$scope.orderInfo.orderno,lon:1,lat:1}).then(
                function(data){
                    $scope.dfkInfos = data.data.rows;
                }
            ).catch(function(e){console.log(e);});

        }]
);