/**
 * Created by Jack on 15/3/19.
 */
angular.module('services.ds', []).factory('Ds', ['$http' , '$q', '$rootScope',
    function ($http, $q, $rootScope) {
        var _store = window.localStorage;
        var Ds = {
            has:function(_key){
                //localStorage();
                return null !== _store.getItem(_key);
            },
            clear:function(){
                _store.clear();
            },
            set:function(_key,_value){
                var item = {};
                item.type = typeof(_value);
                item.content = _value;
                _store.setItem(_key, JSON.stringify(item));
            },
            get:function(_key){
                var item = JSON.parse(_store.getItem(_key));

                return item.content;
            },
            remove:function(_key) {
                _store.removeItem(_key);
            }
        };


        return Ds;

    }
]);