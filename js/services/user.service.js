(function() {
    angular.module('flock').factory('userService', ['$http', '$q', 'store', function($http, $q, store) {
        var service = {};
        service.getStudent = getStudent;
        service.getAll = getAll;
        service.register = register;
        service.login = login;
        service.logout = logout;
        service.getCrushes = getCrushes;
        service.updateCrushes = setCrushes;
        service.current = getCurrent;
        service.host = 'http://localhost:5000';
        var students;

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
       
        function getCurrent(){
           var tokenData = store.get('jwt');
           console.log(tokenData);
           return tokenData;
        }
       
        function getAll(){
            return $http({
               url: (service.host + '/api/middlebury/users'),
               method: 'GET'
            }).then(
               function(response){
                  //TODO: check response code
                  return response.data.users;
               },
               function(error){
                  return error;
               }
            );
        }
       
        function getCrushes(){
            var currentUser = getCurrent();
            console.log('Getting crushes for ' + currentUser.username);
            //maybe make a custom promise here
            return $http({
               url: (service.host + '/api/user/me/crushes'),
               method: 'GET'
            }).then(
               function(response){
                  //TODO: check response code
                  return response.data;
               },
               function(error){
                  return error;
               }
            );
        }
       
        function setCrushes(crushes){
           //crushes should be an array of emails
           var currentUser = getCurrent();
            console.log('Updating crushes for ' + currentUser.username);
            //maybe make a custom promise here
           if (typeof crushes[0] === "object"){
               var crushes = crushes.map(function(crush){
                  return {email: crush.email, hint: crush.hint};
               });
           }
            return $http({
               url: (service.host + '/api/user/me/crushes'),
               method: 'POST',
               data: {'crushes': crushes}
            }).then(
               function(response){
                  //TODO: check response code
                  return response.data;
               },
               function(error){
                  return error;
               }
            );
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
                    url: (service.host + '/register'),
                    method: 'POST',
                    data: newUser
                }).then(function(response) {
                    store.set('jwt', response.data.token);
                    defer.resolve(response);
                }, function(error) {
                    defer.reject(error);
                });

            } else {
                defer.reject("Could not register user. Either you used an email not in our system or your passwords did not match.");
            }

            return defer.promise;
        }
       
        function logout(){
           var currentUser = getCurrent();
           console.log("Logging out " + currentUser.username);
           store.storage.remove('jwt');
           //delete token
        }

        function login(user) {
            var defer = $q.defer();
            $http({
                url: (service.host + '/authenticate'),
                method: 'POST',
                data: user
            }).then(function(response) {
                store.set('jwt', response.data.token);
                defer.resolve(response);
            }, function(error) {
                defer.reject(error)
            })

            return defer.promise;
        }

        return service;
    }])
})();