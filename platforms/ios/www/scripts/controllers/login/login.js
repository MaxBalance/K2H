/**
 * Created by Jack on 15/3/19.
 */
angular.module('K2H.app')
    .controller('loginController',
    ['$scope','$state','Ds','LoginService',
        function($scope,$state,Ds,LoginService){
            $scope.softLogin = function (softName){
                YFShare.auth(function(user){
                    Ds.set('qq_wx_Login',user);
                    Ds.set('loginWay',softName);
                    $scope.qq_wx_name = user.name;
                    $scope.qq_wx_icon = user.icon;

                    LoginService.uniteLogin({openid:user.uid,opentype:softName}).then(
                        function (data){
                            if(data.code == 0){
                                Ds.set("userid",data.data.rows[0].uid);
                                //alert(Ds.get('userid'));
                            }
                        }
                    );
                    history.go(-1);
                },function(error){alert(error);},[softName]);//qq登录
            }
            $scope.share = function (){
                YFShare.share(function(){alert('ok');},function(error){alert(error);},['title','content','http://blog.yfsoft.info','zheshi duan miaoshu']);//分享
            }

        }]);