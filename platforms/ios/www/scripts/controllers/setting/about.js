/**
 * Created by yanhao on 15/3/13.
 */
angular.module('K2H.app')
    .controller('aboutController',
    ['$scope','MainService','$ionicGesture',
        function($scope,MainService,$ionicGesture){
            //alert($ionicGesture.off());
            MainService.about({user_flag:1}).then(
                function(data){
                    $scope.version = data.data.rows[0].version;
                }
            ).catch(function(e){console.log(e);});
        }
    ])
;
