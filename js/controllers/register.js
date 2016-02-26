(function() {
    angular.module('flock').controller('registerCtrl', ['$uibModal', 'userService', 'store', '$state', function ($uibModal, userService, store, $state) {
        var vm = this;

        vm.user = {};

        vm.register = register;
        vm.openLogin = openLogin;

        function register() {
            //alerts are not the way we want to handle the promise success/rejections here
            //but I'm not sure how I want to do it yet.
            //See implementation in userService...the if/else there complicates things
            //We want to do it like you've done it (i.e. alert("Error: " + error.code + " " + error.message);)
            //however, we're checking on the front end if the email is in our Midd_Emails_2016...
            //If we moved that check to the backend, then we could send an unprocessable entity error code back...
            userService.register(vm.user)
                .then(function(response) {
                    alert("Success! You should receive a verification email shortly.");
                    store.set('jwt', response.data.id_token);
                    $state.go('dashboard');
                }, function(reason) {
                    alert(reason);
                });


            //user.signUp(null, {
            //    success: function (user) {
            //        //alert("Congrats! You've been registered! Check your email for the next steps.");
            //        $('.jumbotron').html("<h1>Thanks!</h1><p>Congrats! You have been registered and should receieve a verification email shortly.</p><p>After confirming your email you can start making your crush list!</p>");
            //    },
            //    error: function (user, error) {
            //        alert("Error: " + error.code + " " + error.message);
            //    }
            //});
        }

        function openLogin() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'directives/loginModal.html',
                controller: 'loginCtrl as vm',
                size: 'sm'
            })
        }
    }]);
})();
