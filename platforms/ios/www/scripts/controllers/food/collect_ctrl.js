angular.module('K2H.app')
    .controller('collectController',
    ['$scope','$state','$stateParams','CollectService','Ds',
        function($scope, $state, $stateParams,CollectService,Ds){
            CollectService.myCollect({uid:Ds.get('userid'),lon:32,lat:32}).then(function(res){
                if(res.code == 0){
                    $scope.collectsList = res.data.rows;
                }
                console.log(res);
            }).catch(function(err){
                console.log(err);
            });

            $scope.foodDetail = function (food) {
                $state.go('food',{fid:food.fid,rid:food.rid})
            };
        }
    ])
;