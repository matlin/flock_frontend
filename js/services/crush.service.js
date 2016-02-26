(function() {
    angular.module('flock').factory('crushService', ['$rootScope', function($rootScope) {
        var service = {};

        return service;

        ////this actually probably wants to stay in the controller
        //$scope.addCrush = function (user) {
        //    if (checkByName(user.name) && $scope.crushes.length < $scope.crushLimit) {
        //        $scope.crushes.push(user);
        //        $scope.unsaved = true;
        //    }
        //};
        //
        ////Probably want to do this with an associative array of some sort, but maybe this is okay for now
        //function checkByName(name) {
        //    for (var i = 0; i < $rootScope.middDatabase.length; i++) {
        //        if ($rootScope.middDatabase[i].name == name) {
        //            return true;
        //        }
        //    }
        //    return false;
        //}
        //
        //service.removeCrush = function (user) {
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
        //    }
        //};
        //
        //service.loadCrushes = function () {
        //    var lastSunday = $scope.lastSunday(new Date());
        //    var CrushCollection = Parse.Object.extend("CrushSet");
        //    var query = new Parse.Query(CrushCollection);
        //    query.equalTo("owner", Parse.User.current());
        //    //query.equalTo("week", lastSunday);
        //    query.first({
        //        success: function (obj) {
        //            if (obj) {
        //                $scope.crushSet = obj;
        //                console.log("Retrieved crushes.", obj);
        //                var crushArray = obj.get('crushes');
        //                crushArray = crushArray.map(function (elem) {
        //                    if (typeof elem == "string") {
        //                        return JSON.parse(elem);
        //                    } else {
        //                        return elem;
        //                    }
        //                });
        //                $scope.crushes = crushArray;
        //            } else {
        //                $scope.crushes = [];
        //            }
        //            $scope.loading = false;
        //            $scope.$apply();
        //        },
        //        error: function (error) {
        //            console.log("Error in retrieving crushes.", error.message);
        //        }
        //    }).then(function () {
        //        $scope.loadMatches();
        //    });
        //};
        //
        //$scope.saveCrushes = function () {
        //    if ($scope.crushes.length <= $scope.crushLimit) {
        //        var crushList;
        //        if ($scope.crushSet) {
        //            crushList = $scope.crushSet;
        //        } else {
        //            var CrushCollection = Parse.Object.extend("CrushSet");
        //            crushList = new CrushCollection();
        //            crushList.set('owner', Parse.User.current());
        //        }
        //
        //        var crushArray = $scope.crushes;
        //        crushArray = crushArray.map(function (elem) {
        //            return JSON.parse(angular.toJson(elem));
        //        });
        //        crushList.set('crushes', crushArray);
        //
        //        var lastSunday = $scope.lastSunday(new Date());
        //        crushList.set('week', lastSunday);
        //
        //        crushList.save(null, {
        //            success: function (crustList) {
        //                window.alert("Crushes saved succesfully!");
        //                $scope.unsaved = false;
        //                $scope.crushSet = crustList;
        //                $scope.$apply();
        //            },
        //            error: function (crushList, error) {
        //                window.alert("Error", error.error);
        //            }
        //        });
        //    }
        //};
    }])
})();