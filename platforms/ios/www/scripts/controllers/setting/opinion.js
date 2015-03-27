/**
 * Created by iosdev2 on 15/3/17.
 */
angular.module('K2H.app')
    .controller('opinionController',
    ['$scope','$ionicPopup','$state','MainService',
        function($scope,$ionicPopup,$state,MainService){

            $scope.invalid = false;
            //意见反馈
            $scope.postOpinion = function(opinionInfo){
                if(opinionInfo == undefined){
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的信息!',
                        okType:'button-balanced'
                    });
                    return false;
                }
                if(!opinionInfo.content){
                    var alertPopup = $ionicPopup.alert({
                        title:'还没写您宝贵的意见!',
                        okType:'button-balanced'
                    });
                    return false;
                }
                var re = /^[\u4e00-\u9fa5]{0,}$/;
                if(re.test(opinionInfo.contact)){
                    $ionicPopup.alert({
                        title:'联系方式不能为中文!',
                        okType:'button-balanced'
                    });
                    return false;
                }
                if(isNaN(opinionInfo.contact)){
                    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(opinionInfo.contact)) {
                        var alertPopup = $ionicPopup.alert({
                            title:'请填写正确的邮箱地址!',
                            okType:'button-balanced'
                        });
                        return false;
                    }
                }else{
                    if (!/^1\d{10}$/.test(opinionInfo.contact)) {
                        var alertPopup = $ionicPopup.alert({
                            title:'请填写正确的手机号!',
                            okType:'button-balanced'
                        });
                        return false;
                    }
                }
                $scope.invalid = true;
                MainService.opinion({content:opinionInfo.content,contact:opinionInfo.contact}).then(
                    function(data){
                        if(data.code == 0){
                            $ionicPopup.alert({
                                title:'你的意见已发送成功，我们将竭诚为您服务!',
                                okType:'button-balanced'
                            }).then(function(res) {
                                $state.go('menu.setting');
                            });

                        }
                    }
                ).catch(function(e){console.log(e);});
            }
        }
    ])
;