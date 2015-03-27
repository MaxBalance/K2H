/**
 * Created by iosdev2 on 15/3/14.
 */
angular.module('K2H.app')
    .controller('GuideCtrl', ['$scope','$state','Ds',
        function($scope,$state,Ds) {
            Ds.set('guide',true);
        $scope.runApp = function(){
            $state.go( 'getPosition' );
        }
    }
]);