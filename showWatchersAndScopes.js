(function() {
    var showWatchers = function () { 
        var root = angular.element(document.getElementsByTagName('body'));
        var watchers = [];

        var f = function (element) {
            angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) { 
                if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                    angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                        watchers.push(watcher);
                    });
                }
            });

            angular.forEach(element.children(), function (childElement) {
                f(angular.element(childElement));
            });
        };

        f(root);

        // Remove duplicate watchers
        var watchersWithoutDuplicates = [];
        angular.forEach(watchers, function(item) {
            if(watchersWithoutDuplicates.indexOf(item) < 0) {
                 watchersWithoutDuplicates.push(item);
                // console.log(item);
            }
        });

        console.log('# of watchers: ', watchersWithoutDuplicates.length);
    };

    var showScopes = function () {
        var root = angular.element(document.body).scope().$root;
        var scopes = [];

        function visit(scope) {
            scopes.push(scope);
            //console.log(scopes);
        }
        function traverse(scope) {
            visit(scope);
            if (scope.$$nextSibling)
                traverse(scope.$$nextSibling);
            if (scope.$$childHead)
                traverse(scope.$$childHead);
        }

        traverse(root);
        console.log('# of scopes: ', scopes.length);
    };

    showWatchers();
    showScopes();
})();