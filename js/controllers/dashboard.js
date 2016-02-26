(function() {angular.module('flock').controller('dashboardCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'crushService', function ($scope, $rootScope, $location, $timeout, crushService) {
    //function init() {
    //    if (!Parse.User.current()) {
    //        $location.path('/');
    //    } else {
    //        if (!$scope.crushes) {
    //            $scope.loadCrushes();
    //            //$scope.loadMatches();
    //            $scope.loading = true;
    //        }
    //        $scope.firstTime = !Parse.User.current().get('loggedInOnce');
    //    }
    //    //$scope.weekendEvents = middEvents.getNewestEvents();
    //    $scope.emailVerified = $route.current.params.emailVerified ? true : false;
    //}
    //
    //$scope.crushLimit = 6;
    //$scope.unsaved = false;
    //
    //$scope.showLoggedIn = function () {
    //    $scope.firstTime = false;
    //    Parse.User.current().set('loggedInOnce', true);
    //    Parse.User.current().save(null, {
    //        success: function (user) {
    //            console.log("Box dismissed and reported to server.");
    //        },
    //        error: function (user, error) {
    //            console.log("Could not report to server");
    //        }
    //    });
    //}
    //$scope.logout = function () {
    //    Parse.User.logOut();
    //    init();
    //}
    //
    //$scope.addCrush = function (user) {
    //    if (crushService.checkByName(user.name) && $scope.crushes.length < $scope.crushLimit) {
    //        $scope.crushes.push(user);
    //        $scope.unsaved = true;
    //    }
    //};
    //
    //$scope.removeCrush = function (user) {
    //    var index = -1;
    //    for (var i = 0; i < $scope.crushes.length; i++) {
    //        if ($scope.crushes[i].name == user.name) {
    //            index = i;
    //            break;
    //        }
    //    }
    //    if (index > -1) {
    //        $scope.crushes.splice(index, 1);
    //        $scope.unsaved = true;
    //
    //    }
    //};
    //
    //$scope.lastSunday = function (date) {
    //    var offset = date.getDay() * 86400000;
    //    var lastSunday = new Date();
    //    lastSunday.setTime(date.getTime() - offset);
    //    return lastSunday.toDateString();
    //};
    //
    //init();
}])})();
