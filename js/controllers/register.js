(function() {
    angular.module('flock').controller('registerCtrl', ['$scope', '$uibModal', 'userService', 'store', '$state', function ($scope, $uibModal, userService, store, $state) {
        var vm = this;

        vm.user = {};

        vm.register = register;
        vm.openLogin = openLogin;

        function register() {
            userService.registerUser(vm.user)
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
                controller: 'login',
                size: 'sm'
            })
        }
    }]);
})();
