angular.module('flock', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'angular-jwt', 'angular-storage'])
    .config(['$stateProvider', '$urlRouterProvider', 'jwtInterceptorProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
        //automatically intercepts all outgoing reqs and adds Auth header w/ jwt
        jwtInterceptorProvider.tokenGetter = ['store', function(store) {
            return store.get('jwt');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'dashboardCtrl',
                templateUrl: 'views/dashboard.html',
                data: {
                    requiresLogin: true
                }
            })
            .state('register', {
                url: '/',
                controller: 'registerCtrl',
                templateUrl: 'views/register.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            });

        //defines default route
        $urlRouterProvider.otherwise('/');
    }])
    .run(function($rootScope, $state, store, jwtHelper) {
        //unauthenticated users redirected to login/register
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (to.data && to.data.requiresLogin) {
                if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                    //prevents state change from happening
                    window.alert("You must be authenticated to acccess " + to.url);
                    e.preventDefault();
                    $state.go('register');
                }
            }
        });
    });