(function() {
    angular.module('flock').factory('userService', ['$http', '$q', function($http, $q) {
        var service = {};
        service.getStudent = getStudent;
        service.registerUser = registerUser;
        var students;

        $http.get('Midd_Emails_2016.json').success(function(resp) {
            students = resp;
        });

        function getStudent(email) {
            for (var i = 0; i < students.length; i++) {
                if (students[i].email == email) {
                    return students[i];
                }
            }
            return null;
        }

        function registerUser(user) {
            var newUser = {};
            var student = getStudent(user.email.toLowerCase());

            var defer = $q.defer();

            if (student && (user.pw1 == user.pw2)) {
                var fullname = student.name.split(", ");

                newUser.username = user.email.split("@")[0];
                newUser.lastnames = fullname[0];
                newUser.firstnames = fullname[1];
                newUser.email = user.email;
                newUser.password = user.pw1;

                $http({
                    url: 'http://localhost:3001/users',
                    method: 'POST',
                    data: newUser
                }).then(function(response) {
                    defer.resolve(response);
                }, function(error) {
                    defer.reject(error);
                });

            } else {
                defer.reject("Could not register user. Either you used an email not in our system or your passwords did not match.");
            }

            return defer.promise;
        }

        return service;
    }])
})();