(function() {
    angular.module('flock').factory('userService', ['$http', '$q', function($http, $q) {
        var service = {};
        service.getStudent = getStudent;
        service.register = register;
        service.login = login;
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

        //not sure how/if I want to use this yet
        //was thinking this might help with the varying defer.reject in register...
        function handleError(err) {
            if (err && err.message) {
                alert("Error: " + err.code + " " + err.message);
            } else if (err) {
                alert("Error: " + err);
            } else {
                alert("An unexpected error occurred.");
            }
        }

        function register(user) {
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
                    url: 'http://localhost:5000/register',
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

        function login(user) {
            console.log(user);
            var defer = $q.defer();
            $http({
                url: 'http://localhost:5000/authenticate',
                method: 'POST',
                data: user
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error)
            })

            return defer.promise;
        }

        return service;
    }])
})();