/**
 * Created by Jack on 15/3/19.
 */
angular.module('K2H.app')
    .controller('sideMenuController',
    ['$scope','$state','$rootScope','Ds','$ionicSideMenuDelegate',
        function($scope,$state,$rootScope,Ds,$ionicSideMenuDelegate){
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {
                    if ((fromState.name == "menu.main" || fromState.name == "menu.setting" || fromState.name == "menu.login") && (toState.name == "menu.collect" || toState.name == "menu.address" || toState.name == "menu.menu" || toState.name == "menu.receipt")) {
                        //判断是否登录
                        var isLogin = Ds.has('userid');
                        if (!isLogin) {
                            //跳转至登陆页面
                            $state.go('menu.login',{backurl:toState.name});
                            //阻止事件冒泡
                            event.preventDefault();
                            return false;
                        }
                    }
                }
            );

            $scope.$on('login.uniteLogin',function(){
                $scope.qq_wx_name = Ds.get('qq_wx_Login').name;
                $scope.qq_wx_icon = Ds.get('qq_wx_Login').icon;
                $scope.qq_wx_Login = true;
            });
            $scope.$on('login.uniteLogout',function(){
                $scope.qq_wx_Login = false;
                $scope.qq_wx_name = '未登录';
                $scope.qq_wx_icon = 'images/logo_qq.png';
            });

            $scope.qq_wx_Login = Ds.has('qq_wx_Login');
            if($scope.qq_wx_Login){
                $scope.qq_wx_name = Ds.get('qq_wx_Login').name;
                $scope.qq_wx_icon = Ds.get('qq_wx_Login').icon;
            }else{
                $scope.qq_wx_name = '未登录';
                $scope.qq_wx_icon = 'images/logo_qq.png';
            }

            $scope.loginPage = function (){
                $state.go('menu.login');
            }



            $scope.search = function(){
                $state.go('search');
            };

            $scope.notify = function(){
                $state.go('menu.pu.notification');
            };


            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };


        }]);