/**
 * Created by Jack on 15/3/23.
 */
angular.module('K2H.app')
    .controller('getPositionCtrl',
    ['$scope','$state','$ionicPopup','Ds','LoginService',
        function($scope,$state,$ionicPopup,Ds,LoginService){
     
            if(!Ds.has('userid')){
                LoginService.randomLogin().then(
                    function(data){
                        Ds.set('userid',data.data.rows[0].uid)
                    }
                );
            }

            $scope.dinner = {address:'',member:(Ds.has('dinnerMember'))?(Ds.get('dinnerMember')):'',perPrice:'200',time:(Ds.has('dinnerTime'))?(Ds.get('dinnerTime')):'预约用餐时间'};

             //GPS定位
             navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true});
             //GPS定位成功
             function onSuccess(position) {
                 //alert('Latitude: '          + position.coords.latitude          + '\n' +
                 //'Longitude: '         + position.coords.longitude         + '\n' +
                 //'Altitude: '          + position.coords.altitude          + '\n' +
                 //'Accuracy: '          + position.coords.accuracy          + '\n' +
                 //'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                 //'Heading: '           + position.coords.heading           + '\n' +
                 //'Speed: '             + position.coords.speed             + '\n' +
                 //'Timestamp: '         + position.timestamp                + '\n');

                 // 百度地图API功能
                 //GPS坐标
                 var xx = position.coords.longitude;
                 var yy = position.coords.latitude;
                 //alert(xx+','+yy);
                 var gpsPoint = new BMap.Point(xx,yy);
                 BMap.Convertor.translate(gpsPoint,0,translateCallback);
             };

            //坐标转换完之后的回调函数
            function translateCallback(point){
                //alert(point.lng + "," + point.lat);
                Ds.set('Latitude',point.lng);
                Ds.set('Longitude',point.lat);
                // 百度地图API功能
                var point = new BMap.Point(point.lng,point.lat);//new BMap.Point(116.331398,39.897445);
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function(rs){
                    var addComp = rs.addressComponents;
                    //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    $scope.dinner.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                });
            }

             //GPS定位失败
             function onError(error) {
                 Ds.set('Latitude','116.331398');
                 Ds.set('Longitude','39.897445');
             //alert('code: '    + error.code    + '\n' +
             //      'message: ' + error.message + '\n');
                 $scope.dinner.address = '请输入您的用餐地址';
                 switch(error.code)
                 {
                     case 1:
                         $ionicPopup.alert({
                             title:'您拒绝了使用位置共享服务，请手动输入您的就餐地址。!',
                             okType:'button-balanced',
                             okText:'确定'
                         });
                         break;
                     default :
                         $ionicPopup.alert({
                             title:'获取位置失败，请手动输入您的就餐地址。!',
                             okType:'button-balanced',
                             okText:'确定'
                         });
                         break;
                 }
             }

            //获取当前位置
            $scope.getPosition = function (){
                navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true});
            }

//     alert(Ds.get('Longitude'));alert(Ds.get('Latitude'));

            $scope.bookDinner = function (){
                if($scope.dinner == undefined){
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写正确的信息!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if($scope.dinner.address == '请输入您的用餐地址'){
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写用餐地址!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if (!$scope.dinner.member) {
                    var alertPopup = $ionicPopup.alert({
                        title:'请填写用餐人数!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                if($scope.dinner.time == '预约用餐时间'){
                    var alertPopup = $ionicPopup.alert({
                        title:'还没有选择用餐时间!',
                        okType:'button-balanced',
                        okText:'确定'
                    });
                    return false;
                }
                Ds.set('dinnerAddress',$scope.dinner.address);
                Ds.set('dinnerMember',$scope.dinner.member);
                Ds.set('dinnerTime',$scope.dinner.time);
                Ds.set('dinnerPrice',$scope.dinner.perPrice);
                $state.go('menu.main');
            }

            //预约时间
            var d = new Date();
            $scope.dinnerTime=function(){
                $scope.o = {bookDate:d};
                var myPopup = $ionicPopup.show({
                    template: '<input type="datetime-local" style="text-align: center " ng-model="o.bookDate" >',
                    title: '预约到达时间',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>确认</b>',
                            type: 'button-positive',
                            onTap: function() {
                                $scope.dinner.time = $scope.getOrderTime($scope.o.bookDate.getTime());
                                //$scope.dinner.time = $scope.o.bookDate
                            }
                        }
                    ]
                });
            }

            $scope.getOrderTime = function(nS) {
                var time = new Date(parseInt(nS));
                var year = time.getFullYear();
                var month = time.getMonth()+1;
                var date = time.getDate();
                var hour = time.getHours();
                var minute = time.getMinutes();
                var second = time.getSeconds();
                return year+"-"+((month+1)<=10?'0':'')+month+"-"+((date+1)<=10?'0':'')+date+" "+((hour+1)<=10?'0':'')+hour+":"+((minute+1)<=10?'0':'')+minute+":"+((second+1)<=10?'0':'')+second;
            }
        }]);