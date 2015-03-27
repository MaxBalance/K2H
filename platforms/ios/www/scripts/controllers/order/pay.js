/**
 * Created by Jack on 15/3/18.
 */
angular.module('K2H.app')
    .controller('payOrderController',
    ['$scope','$state','$ionicModal','$ionicPopup','Ds','OrderService',
        function($scope,$state,$ionicModal,$ionicPopup,Ds,OrderService){
     
            var lat = Ds.get('Latitude');
            var lon = Ds.get('Longitude');
            var userid = Ds.get('userid');

            console.log($state.params);
            $scope.orderInfo = {contacts:(Ds.has('contacts'))?(Ds.get('contacts')):'',contactWay:(Ds.has('contactWay'))?(Ds.get('contactWay')):'',address:Ds.get('dinnerAddress'),time:Ds.get('dinnerTime'),invoice_title:(Ds.has('invoice_title'))?(Ds.get('invoice_title')):'',message:(Ds.has('message'))?(Ds.get('message')):'',amount:$state.params.amount};

            $scope.invalid = false;
            //提交订单
            $scope.postOrder = function (){
                if($scope.orderInfo == undefined){
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的信息!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if(!$scope.orderInfo.contacts){
                    var alertPopup = $ionicPopup.alert({
                        title:'还没写收件人的姓名!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if (!/^1\d{10}$/.test($scope.orderInfo.contactWay)) {
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的手机号!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if(!$scope.orderInfo.invoice_title){
                    $scope.orderInfo.invoice_title = $scope.orderInfo.contacts;
                }
                $scope.invalid = true;
                if(Ds.has('qq_wx_Login')){
                    OrderService.postOrder({uid:userid,rid:Ds.get('rid'),name:$scope.orderInfo.contacts,mobile:$scope.orderInfo.contactWay,address:Ds.get('dinnerAddress'),booktime:Ds.get('dinnerTime'),invoice:$scope.orderInfo.invoice_title,lon:lon,lat:lat,message:$scope.orderInfo.message}).then(
                        function (data){
                            if(data.code == 0){
                                $ionicPopup.show({
//                                template: '<input type="text" style="text-align: center " ng-model="data.foodCount" >',
                                    title: '订单提交成功',
                                    subTitle: '立即去支付？',
                                    scope: $scope,
                                    buttons: [
                                        { text: '取消' },
                                        {
                                            text: '<b>确认</b>',
                                            type: 'button-positive',
                                            onTap: function() {
                                                //付款
                                                YFPay.alipay(function(){alert('ok');},
                                                    function(){alert('error');},
                                                    [data.data.rows[0].orderno,//订单号
                                                        'YFPay',//支付subject
                                                        'YFPay',//支付body
                                                        '0.01']//金额
                                                );
                                            }
                                        }
                                    ]
                                });
                            }else{
                                $ionicPopup.alert({
                                    title:'提交订单失败!',
                                    subTitle: '错误代码：' + data.code,
                                    okType:'button-balanced',
                                    okText:'确定'
                                })
                                return false;
                            }
                            if(Ds.has('contacts')){
                                Ds.remove('contacts');
                                Ds.remove('contactWay');
                                Ds.remove('invoice_title');
                                Ds.remove('message');
                            }
                        }
                    ).catch(function(e){console.log(e);});
                }else{
                    Ds.set('contacts',$scope.orderInfo.contacts);
                    Ds.set('contactWay',$scope.orderInfo.contactWay);
                    Ds.set('invoice_title',$scope.orderInfo.invoice_title);
                    Ds.set('message',$scope.orderInfo.message);
                    //跳转至登陆页面
                    $state.go('menu.login');
                }

            }

        }]
);