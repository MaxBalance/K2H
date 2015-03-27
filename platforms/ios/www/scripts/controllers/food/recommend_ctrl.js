angular.module('K2H.app')
    .controller('recommendController',
    ['$scope','$state','$stateParams','Ds','RecommendService','MyMenuService','$ionicPopup','$ionicActionSheet','$timeout',
        function($scope, $state, $stateParams,Ds,RecommendService,MyMenuService,$ionicPopup,$ionicActionSheet,$timeout){
            if(Ds.has('dinnerMember')){
                var num = Ds.get('dinnerMember');
            }else{
                var alertPopup = $ionicPopup.alert({
                    title:'请选择用餐人数',
                    okType:'button-assertive',okText:'重新定位'
                }).then(function () {
                        $state.go('getPosition');
                })
            }
            if(Ds.has('dinnerPrice')){
                var price = Ds.get('dinnerPrice');
            }else{
                var alertPopup = $ionicPopup.alert({
                    title:'请选择客单价',
                    okType:'button-assertive',okText:'重新定位'
                }).then(function () {
                    $state.go('getPosition');
                })
            }
            RecommendService.typeList({uid:Ds.get('userid'),rid:$stateParams.rid,rs:num}).then(function(res){
                if(res.code == 0){
                    $scope.typeList = res.data.rows;
                }
                console.log(res);
            }).catch(function(err){
                console.log(err);
            });

            //数量减
            $scope.sub = function (food) {
                if(food.checked)return;
                if(food.cnt == 1){
                    return;
                }else{
                    food.cnt -= 1;
                }
            }

            //数量加
            $scope.plus = function (food) {
                if(food.checked)return;
                food.cnt += 1;
            }

            var fids = [],fid = '';
            var cnts = [],cnt = '';
            //勾选
            $scope.select = function (food) {
                if(food.checked){
                    fids.push( food.id);
                    cnts.push( food.cnt);
                }else{
                    for (var i=0;i<fids.length;i++){
                        if(fids[i] == food.id){
                            fids.splice(i,1);
                            cnts.splice(i,1);
                        }
                    }
                }
                fid = fids.toString();
                cnt = cnts.toString();
            }
            var search = function (id,page) {
                RecommendService.foodList({uid:36,rid:$stateParams.rid,rs:num,price:price,tagid:id,page:page}).then(function(res){
                    if(res.code == 0){
                        angular.forEach(res.data.rows, function (data) {
                           data.cnt = 1;
                        })
                        $scope.foodList = res.data.rows;
                    }
                    console.log(res);
                }).catch(function(err){
                    console.log(err);
                });
            }
            var page = 1,tag = 1,maxPage = 1;
            search(1,1);

            //推荐类型
            $scope.searchType = function (type) {
                page = 1;
                tag = type.id;
                maxPage = type.maxPage;
                search(type.id,1);
            }

            //重新推荐
            $scope.reRecommend = function () {
                if(maxPage == 1){
                    var hideSheet = $ionicActionSheet.show({
                        buttons:[{text:'没有更多推荐了'}]
                        //titleText:'没有更多推荐了'
                    });
                    $timeout(function () {
                        hideSheet();
                    },1000);
                    return;
                }

                page += 1;
                if(page > maxPage){
                    page = 1;
                }
                search(tag,page);
            }

            $scope.$on('add.success', function (event) {
                history.back();
                //$state.go('menu.pu.restaurantDetail',{rid:$stateParams.rid})
            })

            //加入菜单
            $scope.addToMenu = function (food) {
                MyMenuService.editMenu({uid:Ds.get('userid'),rid:$stateParams.rid,fids:fid,cnts:cnt}).then(function (res) {
                    if(res.code == 0){
                        var alertPopup = $ionicPopup.alert({
                            title:'添加成功',
                            okType:'button-assertive',okText:'确定'
                        }).then(function () {
                            $scope.$broadcast('add.success');
                        })
                    }
                    console.log(res);
                }).catch(function (err) {
                    console.log(err);
                })
            }

        }
    ])
;