'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


var batchModule = angular.module('batchModule', []);

/**
 * The `batchLog` service allows for messages to be queued in memory and flushed
 * to the console.log every 50 seconds.     --> change to 3sec to quickly see the change
 *
 * @param {*} message Message to be logged.
 */
batchModule.factory('batchLog', ['$interval', '$log', function($interval, $log) {
    var messageQueue = [];

    function log() {
        if (messageQueue.length) {
            $log.log('batchLog messages: ', messageQueue);
            messageQueue = [];
        }
    }

    // start periodic checking
    $interval(log, 3000);

    return function(message) {
        messageQueue.push(message);
    }
}]);

/**
 * `routeTemplateMonitor` monitors each `$route` change and logs the current
 * template via the `batchLog` service.
 */
batchModule.factory('routeTemplateMonitor', ['$route', 'batchLog', '$rootScope',
    function($route, batchLog, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function() {
            batchLog($route.current ? $route.current.template : null);
            alert('route changed');
        });
    }]);