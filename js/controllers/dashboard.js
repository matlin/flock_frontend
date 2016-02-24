angular.module('flock').controller('dashboard', ['$scope', '$rootScope', '$location', '$timeout', '$route', 'middEvents', function($scope, $rootScope, $location, $timeout, $route, middEvents){
   function init(){
      if (!Parse.User.current()){
         $location.path('/');
      }else{
         if(!$scope.crushes){
            $scope.loadMatches();
            $scope.loadCrushes();
            $scope.loading = true;
         }
         $scope.firstTime = ! Parse.User.current().get('loggedInOnce');
      }
      $scope.weekendEvents = middEvents.getNewestEvents();
      $scope.emailVerified = $route.current.params.emailVerified ? true : false;
   }
   $scope.crushLimit = 6;
   $scope.unsaved = false;
   
   $scope.showLoggedIn = function(){
      $scope.firstTime = false;
      Parse.User.current().set('loggedInOnce', true);
      Parse.User.current().save(null, {
         success: function(user){
            console.log("Box dismissed and reported to server.");
         },
         error: function(user, error){
            console.log("Could not report to server");
         }
      });
   }
   $scope.logout = function(){
      Parse.User.logOut();
      init();
   }
   
      
   $scope.loadMatches = function(){
      Parse.User.current().fetch({
         success: function(user){
            $scope.matches = user.get('matches');
             $scope.$watchCollection('crushes', function(newValue, oldValue) {
               $.each(newValue, function(i, crush){
                  if ($scope.matches.indexOf(crush.email) > -1){
                     console.log("Matched with " + crush.email);
                     crush.match = true;
                  }
               });
            });
         }
      });
   };
   
   $scope.loadCrushes = function(){
     var lastSunday = $scope.lastSunday(new Date());
     var CrushCollection = Parse.Object.extend("CrushSet");
     var query = new Parse.Query(CrushCollection);
     query.equalTo("owner", Parse.User.current());
      //query.equalTo("week", lastSunday);
      query.first({
         success: function(obj){
            if (obj){
               $scope.crushSet = obj;
               console.log("Retrieved crushes.", obj);
               var crushArray = obj.get('crushes');
               crushArray = crushArray.map(function(elem){
                  if (typeof elem == "string"){
                     return JSON.parse(elem);
                  }else{
                     return elem;
                  }
               });
               $scope.crushes = crushArray;
            }else{
               $scope.crushes = [];
            }
            $scope.loading = false;
            $scope.$apply();
         },
         error: function(error){
            console.log("Error in retrieving crushes.", error.message);
         }
      }).then(function(){
         $scope.loadMatches();   
      });
   };
   $scope.addCrush = function(user){
      function checkByName(name){
               for(var i=0; i<$rootScope.middDatabase.length; i++){
                  if ($rootScope.middDatabase[i].name == name){
                     return true;
                  }
               }
               return false;
            }
      if (checkByName(user.name) && $scope.crushes.length < $scope.crushLimit){
         $scope.crushes.push(user);
         $scope.unsaved = true;
      }
   };
   $scope.removeCrush = function(user){
      var index = -1;
      for(var i=0; i<$scope.crushes.length; i++){
         if ($scope.crushes[i].name == user.name){
            index = i;
            break;
         }
      }
      if (index > -1) {
         $scope.crushes.splice(index, 1);
         $scope.unsaved = true;
         
      }
   };
   $scope.lastSunday = function(date){
         var offset = date.getDay() * 86400000;
         var lastSunday = new Date();
         lastSunday.setTime(date.getTime() - offset);
         return lastSunday.toDateString();
   };
   $scope.saveCrushes = function(){
      if ($scope.crushes.length <= $scope.crushLimit){
         var crushList;
         if ($scope.crushSet){
            crushList = $scope.crushSet;
         }else{
            var CrushCollection = Parse.Object.extend("CrushSet");
            crushList = new CrushCollection();
            crushList.set('owner', Parse.User.current());
         }
         
         var crushArray = $scope.crushes;
         crushArray = crushArray.map(function(elem){
            return JSON.parse(angular.toJson(elem));
         });
         crushList.set('crushes', crushArray);
        
         var lastSunday = $scope.lastSunday(new Date());
         crushList.set('week', lastSunday);
         
         crushList.save(null, {
            success: function(crustList) {
               window.alert("Crushes saved succesfully!");
               $scope.unsaved = false;
               $scope.crushSet = crustList;
               $scope.$apply();
            },
            error: function(crushList, error) {
               window.alert("Error", error.error);
            }
         });
      }
   };
   init();
}])
