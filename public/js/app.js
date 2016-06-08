var app = angular.module('WriteTimeApp', ['WriteCtrls', 'ui.router']);

app.config(['$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider',
  '$httpProvider',
 function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  //define routes
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
  })  
  .state('newpost', {
    url: '/newpost',
    templateUrl: 'views/newpost.html',
    controller: 'NewCtrl'
  })
  .state('allposts', {
    url: '/allposts',
    templateUrl: 'views/allposts.html',
    controller: 'AllCtrl'
  })
  .state('showpost', {
    url: '/posts/:id',
    templateUrl: 'views/showpost.html',
    controller: 'ShowCtrl'
  })
  .state('editpost', {
    url: '/posts/edit/:id',
    templateUrl: 'views/editpost.html',
    controller: 'EditCtrl'
  })
  .state('myposts', {
    url: '/myposts',
    templateUrl: 'views/myposts.html',
    controller: 'MyCtrl'
  });

  $httpProvider.interceptors.push('AuthInterceptor')
  $locationProvider.html5Mode(true);
}]);