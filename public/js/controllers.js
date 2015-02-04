'use strict';

/* Controllers */

var mycontrollers=angular.module('myApp.controllers', []);
mycontrollers.controller('TestLogController',  ['$scope', 'routeTemplateMonitor', function ($scope) {
    $scope.showLog=function(){
       //routeTemplateMonitor();
        console.log('TestLogController initializer');
     };
}]);
mycontrollers.controller('Test3Controller', ['$scope', 'notify', function ($scope, notify) {
        $scope.callNotify = function (msg) {
            notify(msg);
        };
    }]).
    factory('notify', ['$window', function (win) {
        var msgs = [];
        return function (msg) {
            msgs.push(msg);
            if (msgs.length == 3) {
                win.alert(msgs.join("\n"));
                msgs = [];
            }
        };
    }]);

mycontrollers.controller('AppCtrl',function ($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/name'
    }).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });

}).
    controller('MyCtrl1',function ($scope) {
        // write Ctrl here

    }).
    controller('MyCtrl2', function ($scope) {
        // write Ctrl here

    });
