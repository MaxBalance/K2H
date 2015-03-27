angular.module('K2H.app').controller('searchController',['$scope','$state','SearchService','$ionicModal','$ionicSlideBoxDelegate',
        function ($scope,$state,SearchService,$ionicModal,$ionicSlideBoxDelegate) {
            $scope.back = function () {
                history.back();
            }

            //模糊查询
            $scope.keyword = '';
            $scope.fuzzy_search = function (keyword) {
                SearchService.fuzzy_search({'q':$scope.keyword,lon:32,lat:32,uid:Ds.get('userid')}).then(function (res) {
                    if(res.code == 0){
                        $scope.foodsList = res.data.rows;
                    }
                    console.log(res);
                }).catch(function (err) {
                    console.log(err)
                })
            }

            $ionicModal.fromTemplateUrl('search_details.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });

            //精确查询
            $scope.exact_search = function (id) {
                    $scope.modal.show().then(function () {
                    SearchService.exact_search({'fid':id,lon:32,lat:32,uid:Ds.get('userid')}).then(function (res) {
                        if(res.code == 0){
                            $scope.restaurant_Detail = res.data.restaurant[0];

                            $scope.foodList = [];

                            var data = res.data.foods;
                            var amount = res.data.total;
                            var cnt = Math.ceil(amount/6);
                            var foodList = [];
                            for(var i=0,j=0; i<amount,j<cnt;i=i+6,j++){
                                foodList[j]= {'food1':data[i],'food2':data[i+1],'food3':data[i+2],'food4':data[i+3],'food5':data[i+4],'food6':data[i+5]};
                            }
                            $scope.foodList = foodList;
                            $ionicSlideBoxDelegate.update();
                        }
                        console.log(res);
                    }).catch(function (err) {
                        console.log(err)
                    })
                })

                $scope.modal_back = function () {
                    $scope.modal.hide();
                }



            }
    }])
