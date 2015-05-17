'use strict';

/**
 * @ngdoc overview
 * @name pooIhmExemplesApp
 * @description
 * # pooIhmExemplesApp
 *
 * Main module of the application.
 */
angular
  .module('pooIhmExemplesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/users' , {
        templateUrl: 'views/Users/list.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/Users/show.html',
        controller: 'UsersCtrl'
      })
      .when('/add', {
        templateUrl: '../views/Users/add.html',
        controller: 'UsersCtrl'
      })
      .when('/edit/:userId', {
        templateUrl: '../views/Users/edit.html',
        controller: 'UsersCtrl'
      })
      .when('/assign/:userId', {
        templateUrl: '../views/Users/assign.html',
        controller: 'UsersCtrl'
      })
      .when('/projects' , {
        templateUrl: 'views/Projects/list.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/:projectId', {
        templateUrl: 'views/Projects/show.html',
        controller: 'ProjectsCtrl'
      })
      .when('/addP', {
        templateUrl: '../views/Projects/add.html',
        controller: 'ProjectsCtrl'
      })
      .when('/editP/:projectId', {
        templateUrl: '../views/Projects/edit.html',
        controller: 'ProjectsCtrl'
      })
      .when('/assignP/:projectId', {
        templateUrl: '../views/Projects/assign.html',
        controller: 'ProjectsCtrl'
      })
      .when('/roles' , {
        templateUrl: 'views/Roles/list.html',
        controller: 'RolesCtrl'
      })
      .when('/roles/:roleId', {
        templateUrl: 'views/Roles/show.html',
        controller: 'RolesCtrl'
      })
      .when('/addR', {
        templateUrl: '../views/Roles/add.html',
        controller: 'RolesCtrl'
      })
      .when('/editR/:roleId', {
        templateUrl: '../views/Roles/edit.html',
        controller: 'RolesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
