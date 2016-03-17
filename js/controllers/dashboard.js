(function() {angular.module('flock').controller('dashboardCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'userService', '$state', function ($scope, $rootScope, $location, $timeout, userService, $state) {
   'use strict';
   //exports
   var vm = this;
   //variables
   vm.crushes       = [];
   vm.allUsers      = [];
   vm.unsaved       = false;
   vm.crushLimit    = 6;
   //functions
   vm.init          = initialize;
   vm.logout        = logout;
   vm.loadCrushes   = loadCrushes;
   vm.addCrush      = addCrush;
   vm.loadUsers     = loadUsers;
   vm.removeCrush   = removeCrush;
   vm.saveCrushes = saveCrushes;
   
   /* TODO
   vm.loadMatches = loadMatches;
   vm.matches     = matches;
   */
   function initialize(){
      //TODO: convert to promiseAll for multiple promises
      loadUsers().then(function(){
         loadCrushes();
      });
   }
   
   function loadUsers(){
      return userService.getAll().then(
         function(users){
            vm.allUsers = users;
         }
      );
   }
   
   function logout(){
      userService.logout();
      $state.go('register');
   }
   
   function loadCrushes(){
      userService.getCrushes().then(
         function(data){
            //this filter takes O(n) time where n = length of all users
            console.log("Crushes ", data);
            vm.crushes = vm.allUsers.filter(function(user){
               return data.indexOf(user.email) >= 0;
            });
            //vm.crushes = data;
            console.log("Users crushes :", vm.crushes);
      }, function(error){
         console.log(error);
      });
   }
   
   function addCrush(user){
      //TODO: provide check on user.email in email list
      if (vm.crushes.length < vm.crushLimit){
         vm.crushes.push(user);
         vm.unsaved = true;
      }
   }
   
   function removeCrush(user){
      //TODO: can be done more efficiently using index of click
      var index = -1;
      for (var i = 0; i < vm.crushes.length; i++) {
         if (vm.crushes[i].name == user.name) {
             index = i;
             break;
         }
      }
      if (index > -1) {
         vm.crushes.splice(index, 1);
         vm.unsaved = true;
   
      }
   }
   
   function saveCrushes(){
      vm.unsaved = false; //get rid of save button to prevent subsequent presses
      userService.updateCrushes(vm.crushes).then(
         function(){
            console.log("Crushes succesfully saved.");
         }, 
         function(error){
            console.log(error);
            window.alert("Failed to save crushes.");
            vm.unsaved = true;
      });
   }
}])})();
