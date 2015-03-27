angular.module('K2H.app')
    .controller('headerController',
    ['$scope','$state','$ionicSideMenuDelegate',
        function($scope, $state, $ionicSideMenuDelegate){



            $scope.back = function(){
                history.back();
            };

            $scope.search = function(){
                $state.go('menu.search');
            };

            $scope.notify = function(){
                $state.go('menu.pu.notification');
            };


            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
        }
    ])
;
