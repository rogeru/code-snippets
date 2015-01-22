(function() {

    var $rootScope = angular.element('html').scope().$root;
    var UISvc = angular.element('html').injector().get('UISvc');

    function wrapApply(originalCallback) {
        if (!originalCallback) {
            return;
        }
        return function wrappedCallback() {
            var args = arguments;
            var self = this;
            var retval;
            $rootScope.$apply(function () {
                retval = originalCallback.apply(self, args);
                console.log('rendering feed items');
            }, true);
            return retval;
        };
    }

    function scrollTo(obj) {
        if (!obj) {
            return;
        }
        // requestAnimationFrame(fn) pushes fn to be executed in the next CPU cycle.
        // Using requestAnimationFrame(fn) instead of $timeout(fn) enables the browser to optimize the execution pipeline.
        window.requestAnimationFrame(function () {
            if (obj.itemId || obj.creationTime) {
                $rootScope.$broadcast(UIEventType.SCROLL_TO_ITEM, obj);
            } else {
                $rootScope.$broadcast(UIEventType.SCROLL_TO_OFFSET, obj);
            }
        });
    }

    UISvc.scrollToFeedOffset = function (options, cb) {
        scrollTo({
            containerName: 'feed',
            options: options,
            doneCallback: wrapApply(cb)
        });
    };

    UISvc.scrollToFeedItem = function (itemId, creationTime, options, cb) {
        scrollTo({
            containerName: 'feed',
            itemId: itemId,
            creationTime: creationTime,
            options: options,
            doneCallback: wrapApply(cb)
        });
    };

    console.log('UISvc.scroll fix applied');
})();
