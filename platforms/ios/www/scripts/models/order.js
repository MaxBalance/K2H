/**
 * Created by iosdev2 on 15/3/18.
 */
angular.module('models.order',['constants']).factory('Order',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        postOrder:{
            method: API.Method.GET,
            url: API.ResourceBase + "Order/addOrder"
        },
        menuByDfk:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/menuByDfk"
        },
        menuByDfkInfo:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/menuByDfkInfo"
        },
        cancle:{
            method: API.Method.GET,
            url: API.ResourceBase + "Order/CancelOrder"
        },
        menuByYfk:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/menuByYfk"
        },
        menuByYpj:{
            method: API.Method.GET,
            url: API.ResourceBase + "Menu/menuByYpj"
        },
        addOrderComment:{
            method: API.Method.GET,
            url: API.ResourceBase + "Order/addOrderComment"
        }

    });
    return resource;
}]);