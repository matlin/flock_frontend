angular.module('flock', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
.config(function ($routeProvider){
   $routeProvider
   .when('/', {
      templateUrl: 'views/register.html',
      controller: 'register'
   })
   .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboard'
   })
   .when('/about', {
      templateUrl: 'views/about.html',
   })
   .otherwise({
      redirectTo: '/'
   });
})
.run(function($rootScope){
   $.getJSON(url, function(data){
            $rootScope.middDatabase = data;
            //addTypeahead('#studentSearch', middDatabase, "students");
    });
});