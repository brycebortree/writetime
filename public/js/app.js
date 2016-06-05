var app = angular.module('WriteTimeApp', ['WriteCtrls', 'ui.router']);

app.config(['$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider',
 function($stateProvider, $urlRouterProvider, $locationProvider) {
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
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
  });

  $locationProvider.html5Mode(true);
}]);