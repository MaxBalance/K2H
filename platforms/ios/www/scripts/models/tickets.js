/**
 * Created by Jack on 15/3/17.
 */
angular.module('models.tickets',['constants']).factory('Tickets',['$resource', "API", function($resource, API){

    var targetBase  = API.ResourceBase;

    var resource = $resource(targetBase, {}, {

        all:{
            method: API.Method.GET,
            url: API.ResourceBase + "Invoice/myInvoice"
        },
        remove:{
            method: API.Method.GET,
            url: API.ResourceBase + "Invoice/delInvoice"
        },
        add:{
            method: API.Method.GET,
            url: API.ResourceBase + "Invoice/addInvoice"
        },
        update:{
            method: API.Method.GET,
            url: API.ResourceBase + "Invoice/editInvoice"
        }

    });
    return resource;
}]);