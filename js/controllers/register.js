angular.module('flock').controller('register', ['$scope', '$rootScope', '$uibModal', '$location', function($scope, $rootScope, $uibModal, $location){
   function init(){
      if (Parse.User.current()){
         $location.path('/dashboard');
      }
   }
   $scope.register = function(){
            /*var form = document.forms["registerForm"];
            var email = form['email'].value;
            var pw1 = form['password'].value;
            var pw2 = form['confirm-password'].value;*/
            var newEmail = $scope.newUser.email;
            var pw1 = $scope.pw1;
            var pw2 = $scope.pw2;
            function checkEmail(email){
               for(var i=0; i<$rootScope.middDatabase.length; i++){
                  if ($rootScope.middDatabase[i].email == email){
                     return true;
                  }
               }
               return false;
            }
            if (checkEmail(newEmail) && (pw1 == pw2)){
                var username = newEmail.split("@")[0];
                var fullname = $scope.newUser.name.split(", ");
                var lastnames = fullname[0];
                var firstnames = fullname[1];
                //console.log(email, firstnames, lastnames, pw1, pw2);
                var user = new Parse.User();
                user.set("username", username);
                user.set("email", newEmail);
                user.set("firstnames", firstnames);
                user.set("lastnames", lastnames);
                user.set("password", pw1);
                user.signUp(null, {
                    success: function(user){
                        //alert("Congrats! You've been registered! Check your email for the next steps.");
                        $('.jumbotron').html("<h1>Thanks!</h1><p>Congrats! You have been registered and should receieve a verification email shortly.</p><p>After confirming your email you can start making your crush list!</p>");
                    },
                    error: function(user, error){
                        alert("Error: " + error.code + " " + error.message);                
                    }
                });
            }else{
                alert("Could not register user. Either you used an email not in our system or your passwords did not match.");            
            }
            
            
            
    }
   
    $scope.openLogin = function () {
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'directives/loginModal.html',
         controller: 'login',
         size: 'sm',
       });
    }
    init();
}]);