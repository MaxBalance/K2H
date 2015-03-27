/**
 * Created by yanhao on 15/3/15.
 */
angular.module('ui.control', [])
    .directive('uiSquare', ['$timeout', function(timeout){

    return {
        restrict: 'E',
        controller: function($scope, $element){
            $element[0].style.height = $element[0].parentNode.scrollWidth/2 + "px";
        }
    };
}])
    .directive('uiList', ['$timeout', function(timeout){

    return {
        restrict: 'E',
        link: function($scope, $element, $attr){

            ////element.append("<div></div>");
            //var div = angular.element("<div></div>");
            //div.append($element.contents());
            //    console.log($attr);
            ////div.addClass($element.getClass());
            //$element.append(div);
            ////console.log(div.Attributes.$attr);
        }
    };


}])
    .directive('uiItem', ['$document', '$timeout', function($document, timeout){

    return {
        restrict: 'E',
        controller: ['$scope', '$element', function($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
        }],
        scope: true,
        link: function($scope, $element, $attr) {
            var isComplexItem = /ui-button/i.test($element.html());
            if (isComplexItem) {
                var div0 = angular.element("<div class='ui-options'></div>");
                for (var i = 0; i < $element[0].childNodes.length; i++) {
                    if ($element[0].childNodes.item(i).nodeName == 'UI-BUTTON') {
                        div0.append($element[0].childNodes[i]);
                    }
                }
                var div = angular.element("<div class='ui-content'></div>");
                div.append($element.contents());
                $element.append(div);
                $element.append(div0);
                $element.addClass("ui-item");




                var content = $element[0].querySelector('.ui-content');
                var start = function(e){
                    e.preventDefault();
                    if (!e.touches.length) return;
                    var touch = event.touches[0];
                    startX = touch.pageX;
                    content.style['-webkit-transform'] = 'translate3d('+startX+'px,0,0)';
                };

                content.addEventListener('touchstart', start, false)



            }


        }
    };


}]);

UI = function(){

    var HAS_TOUCHEVENTS = ('ontouchstart' in window);

    var MOBILE_REGEX= /mobile|tablet|ip(ad|hone|od)|android|silk/i;

    var NO_MOUSEEVENTS= (HAS_TOUCHEVENTS && window.navigator.userAgent.match(self.MOBILE_REGEX));

    var TYPES= ((NO_MOUSEEVENTS)
        ?['touchstart',
        'touchmove',
        'touchend touchcancel']
        :['touchstart mousedown',
        'touchmove mousemove',
        'touchend touchcancel mouseup']);

    this.EVENT_TYPES= {
        'start': TYPES[0],
        'move': TYPES[1],
        'end': TYPES[2]
    };
};
UI.prototype = {
    /**
     * 添加绑定事件
     * @param o
     * @param eventType
     * @param fun
     */
    addEvent: function(element, eventType, fun){
        element.addEventListener(eventType, fun, false);
    },

    /**
     * 移除绑定事件
     * @param o
     * @param eventType
     * @param fun
     */
    delEvent: function(element, eventType, fun){
        element.addEventListener(eventType, fun, false);
    }
};



