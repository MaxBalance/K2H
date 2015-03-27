/**
 * Created by Jack on 15/3/19.
 */
angular.module('services.login', []).factory('LoginService', ['$http', 'Login', '$q', '$rootScope',
    function ($http, Login, $q, $rootScope) {

        var LoginService = {
            uniteLogin: function(params){
                return Login.uniteLogin(params).$promise.then(function(res){
                    $rootScope.$broadcast( 'login.uniteLogin' );
                    return res;
                });
            },
            uniteLogout:function(){
                $rootScope.$broadcast( 'login.uniteLogout' );
            },
            randomLogin:function() {
                return Login.randomLogin().$promise.then(function(res){
                    return res;
                });
            }

        };


        return LoginService;

    }
]);