angular.module('flock').controller('loginCtrl', ['userService', '$uibModalInstance', '$state', 'store', function (userService, $uibModalInstance, $state, store) {
    var vm = this;

    vm.showReset = false;
    vm.credentials = {};
    vm.login    = login;
    vm.resetPassword = resetPassword;
    vm.cancel = cancel;

    function login() {
        userService.login(vm.credentials).then(function (resp) {
            //store.set('jwt', resp.data.token);
            cancel();
            $state.go('dashboard');
        }, function (reason) {
            alert(reason);
        })
    }

    function resetPassword(email) {}

    //function resetPassword(email) {
    //    Parse.User.requestPasswordReset(email, {
    //        success: function () {
    //            window.alert("Password reset instructions sent to your email.");
    //        },
    //        error: function () {
    //            window.alert("Error in requesting password request.");
    //        }
    //    });
    //};

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }
}]);