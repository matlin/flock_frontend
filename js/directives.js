angular.module('flock')
.directive('countdownBox', function($timeout){
           return{
               restrict: 'E',
               templateUrl: 'directives/countdownBox.html',
               link: function(scope, elem){
                  scope.flockoclock = new Date('Feb 25, 2016 12:00:00 GMT-0500');
                  scope.timeTilMatch = {
                     'days': 0,
                     'hours': 0,
                     'minutes': 0,
                     'seconds': 0
                  };

                  var tick = function(){
                     var diff = new Date();      
                     diff.setTime(scope.flockoclock - diff);
                     scope.timeTilMatch['days'] = Math.floor(diff / 86400000);
                     scope.timeTilMatch['hours'] = Math.floor(diff % 86400000 / 3600000);
                     scope.timeTilMatch['minutes'] = Math.floor(diff % 3600000 / 60000);
                     scope.timeTilMatch['seconds'] = Math.floor(diff % 60000 / 1000);
                     $timeout(tick, 1000);
                  }
                  tick();
               }
           }
})
.directive('crushList', function(){
   return {
      restrict: 'E',
      templateUrl: 'directives/crushList.html',
   }
});