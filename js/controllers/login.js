angular.module('flock').controller('login', ['$scope', '$rootScope', '$uibModalInstance', '$location', function($scope, $rootScope, $uibModalInstance, $location){
   $scope.showReset = false;
   $scope.login = function () {
      //add Parse login logic
      Parse.User.logIn($scope.email, $scope.pw, {
         success: function(user){
            //window.alert("You are now logged in.");
            $uibModalInstance.close();
            $location.path('/dashboard');
         },
         error: function(user, error){
            window.alert("Error: " + error.message);
            //console.log(user, error.message);
         }
      });
  };
   $scope.resetPassword = function(email){
      Parse.User.requestPasswordReset(email, {
         success: function(){
            window.alert("Password reset instructions sent to your email.");
         },
         error: function(){
            window.alert("Error in requesting password request.");
         }
      });
   };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);