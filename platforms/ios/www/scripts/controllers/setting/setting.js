/**
 * Created by Jack on 15/3/17.
 */
angular.module('K2H.app')
    .controller('settingController',
    ['$scope','$state','Ds','LoginService',
        function($scope, $state,Ds,LoginService){

            $scope.isLogin = Ds.has('qq_wx_Login');

            //跳转至意见反馈 By Jack
            $scope.opinion = function(){
                $state.go('menu.pu.feedback');
            }

            $scope.about = function() {
                $state.go('menu.pu.about');
            };

            //退出
            $scope.logout = function (){
                YFShare.logout(function(){
                    Ds.remove('qq_wx_Login');
                },[Ds.get('loginWay')]);//登出
                LoginService.uniteLogout();
                LoginService.randomLogin().then(
                    function(data){
                        Ds.set('userid',data.data.rows[0].uid)
                    }
                );
                $state.go('menu.main');
            }
        }
    ])
;