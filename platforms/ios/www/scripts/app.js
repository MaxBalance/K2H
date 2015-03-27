/**
 * Created by yanhao on 15/3/12.
 */
angular.module('K2H.app',
    [
        'ui.router',
        'ngResource',
        'ui.control',
        'constants',
        'models.main',
        'models.search',
        'models.notification',
        'models.restaurantList',
        'models.restaurantDetail',
        'models.tickets',
        'models.address',
        'models.mymenu',
        'models.order',
        'models.login',
        'models.food',
        'models.collect',
        'models.recommend',
        'services.main',
        'services.search',
        'services.notification',
        'services.restaurantList',
        'services.restaurantDetail',
        'services.tickets',
        'services.address',
        'services.mymenu',
        'services.order',
        'services.ds',
        'services.login',
        'services.food',
        'services.collect',
        'services.recommend',
        'ionic'
    ])
    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider){
        //禁止侧滑后退事件
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $stateProvider
            .state('menu',{
                url:'/menu',
                abstract: true,
                templateUrl: 'templates/layout/menu.html',
                controller:'sideMenuController'
            })
            .state('menu.pu', {
                url:'/pu',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/headers/header.html',
                        controller: 'headerController'
                    }
                }
            })
            .state('food', {
                url:'/food/:fid/:rid',
                templateUrl: 'templates/page/food/food.html',
                controller: 'foodInfoController'
            })
            //餐厅列表
            .state('menu.pu.restaurantList', {
                url:'/restaurantList',
                templateUrl: 'templates/page/restaurant/restaurantList.html',
                controller:'restaurantListController'
            })
            //餐厅详情
            .state('menu.pu.restaurantDetail', {
                url:'/restaurantDetail/:rid',
                templateUrl: 'templates/page/restaurant/restaurantDetail.html',
                controller : 'restaurantDetailController'
            })
            //总厨推荐
            .state('menu.pu.recommend', {
                url:'/recommend/:rid',
                templateUrl: 'templates/page/food/recommend.html',
                controller: 'recommendController'
            })

            .state('menu.pu.foodList', {
                url:'/foodList/:tid/:title',
                templateUrl: 'templates/page/food/list.html',
                controller: 'foodListController'
            })
            .state('menu.pu.about', {
                url:'/about',
                templateUrl: 'templates/page/setting/about.html',
                controller: 'aboutController'
            })
            .state('menu.pu.feedback', {
                cache:false,
                url:'/feedback',
                templateUrl: 'templates/page/setting/feedback.html',
                controller: 'opinionController'
            })
            .state('menu.pu.saveInvoice', {
                cache:false,
                url:'/saveInvoice/:id/:uid/:create_date/:status/:invoice_title',
                templateUrl: 'templates/page/receipt/save.html',
                controller: 'saveInvoiceController'
            })
            .state('menu.pu.saveAddress', {
                cache:false,
                url:'/saveAddress/:id/:uid/:to_name/:to_addr/:to_phone',
                templateUrl: 'templates/page/address/save.html',
                controller: 'saveAddressController'
            })
            .state('menu.pu.pay', {
                url:'/pay/:total/:amount/:address/:addressId',
                templateUrl: 'templates/page/order/pay.html',
                controller: 'payOrderController'
            })
            .state('menu.pu.comment', {
                url:'/order/comment/:orderno',
                templateUrl: 'templates/page/order/comment.html',
                controller: 'commentController'
            })
            .state('menu.pu.orderinfo', {
                url:'/order/info/:id/:groupno/:create_date/:orderno/:amount',
                templateUrl: 'templates/page/order/info.html',
                controller: 'orderInfoController'
            })

            .state('menu.pu.notify', {
                url:'/notify',
                templateUrl: 'templates/page/main/notification.html'
            })

            //我的消息
            .state('menu.pu.notification', {
                url:'/notification',
                templateUrl: 'templates/page/main/notification.html',
                controller : 'notificationController'
            })

            //搜索页面
            .state('search', {
                url:'/search',
                templateUrl: 'templates/page/main/search.html',
                controller : 'searchController'
            })



            //.state('menu.header', {
            //    url:'/header',
            //    views: {
            //        'menuContent':{
            //            templateUrl: 'templates/headers/menuHeader.html',
            //            controller: 'headerController'
            //        }
            //    }
            //})
            .state('menu.login', {
                url:'/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/login/login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('menu.main', {
                cache:false,
                url:'/main',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/main/main.html',
                        controller: 'mainController'
                    }
                }
            })
            .state('menu.collect', {
                cache:false,
                url:'/collect',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/collect/list.html',
                        controller: 'collectController'
                    }
                }
            })
            .state('menu.menu', {
                cache:false,
                url:'/menu',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/menu/list.html',
                        controller: 'myMenuController'
                    }
                }
            })
            .state('menu.order', {
                cache:false,
                url:'/order',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/order/list.html',
                        controller: 'myOrderController'
                    }
                }
            })
            .state('menu.pu.newMenu', {
                cache:false,
                url:'/newMenu',
                templateUrl: 'templates/page/menu/newMenu.html',
                controller: 'newMenuController'
            })
            .state('menu.receipt', {
                cache: false,
                url: '/receipt',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/receipt/list.html',
                         controller: 'ticketsListController'
                    }
                }
            })
            .state('menu.address', {
                cache:false,
                url:'/address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/address/list.html',
                        controller: 'addressListController'
                    }
                }
            })
            .state('menu.setting', {
                cache:false,
                url:'/setting',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/page/setting/setting.html',
                        controller: 'settingController'
                    }
                }
            })
            .state('menu.pu.overallView', {
                url: "/overallView",
                templateUrl: "templates/page/overallView/overallView.html",
                controller: 'OverallViewCtrl'
            })
            .state('guide', {
                url: "/guide",
                templateUrl: "templates/page/guide/guide.html",
                controller: 'GuideCtrl'
            })
            .state('getPosition', {
                url: "/getPosition",
                templateUrl: "templates/page/getPosition/getPosition.html",
                controller: 'getPositionCtrl'
            })
        ;

        var _store = window.localStorage;
        var guide = _store.getItem('guide');
        $urlRouterProvider.otherwise(guide?'getPosition':'guide');
    });

function getOrderTime(nS) {
    var time = new Date(parseInt(nS) * 1000);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    //return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    return year+"-"+((month+1)<=10?'0':'')+month+"-"+((date+1)<=10?'0':'')+date+" "+((hour+1)<=10?'0':'')+hour+":"+((minute+1)<=10?'0':'')+minute+":"+((second+1)<=10?'0':'')+second;
}
