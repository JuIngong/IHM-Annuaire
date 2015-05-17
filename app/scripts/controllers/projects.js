'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
        $scope.count = data.count;
      })
      .error(function(data) {
        $scope.status = "danger";
        $scope.message = "Failure";
      });

    if($routeParams.projectId) {
      $routeParams.projectId = $routeParams.projectId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
      .success(function(data) {
        if (data.status == "success") {
          $scope.currentProject = subDate(data.data);
          $scope.currentProject.description = nullToNoData($scope.currentProject.description);
          $scope.currentProject.year = nullToNoData($scope.currentProject.year);

          $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users')
            .success(function(dataa) {
              if (dataa.status == "success") {

                $scope.users = nullToNoData(dataa.data);
                //$scope.projects[0] = ($scope.projects[0] == null || $scope.projects[0] == "")?"{no project}":$scope.projects[0];

              }
            });

        }
      });
    }

    $scope.myAssign = function (roleName, UserId) {
      var putData = new Object();

      if (roleName == null || roleName == "")
      {
        return;
      }
      putData.name = nullToNoData(roleName);

      if (UserId == null || UserId == "")
      {
        return;
      }

      putData.UserId = nullToNoData(UserId);

      putData.ProjectId = $scope.currentProject.id;

      var putJson = JSON.stringify(putData);

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', putJson)
        .success(function(data) {
          if (data.status == "success") {
            $location.path('/projects/:' + $scope.currentProject.id);
          }
        });
    }

    $scope.myEdit = function (id, newTitle, newDescription, newYear) {
      var putData = new Object();
      putData.title = newTitle;
      putData.description = newDescription;
      putData.year = newYear;

      var putJson = JSON.stringify(putData);

      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $scope.currentProject.id, putJson)
        .success(function(data) {
          if (data.status == "success") {
            $location.path('/projects/:' + $scope.currentUser.id);

          }

        });
    }

    $scope.myAdd = function(newTitle, newDescription, newYear) {
      var putData = new Object();

      if (newTitle == null || newTitle == "")
      {
        return;
      }
      putData.title = nullToNoData(newTitle);
      putData.description = nullToNoData(newDescription);


      putData.year = newYear;

      var putJson = JSON.stringify(putData);

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', putJson)
        .success(function(data) {
          if (data.status == "success") {
            $location.path('/projects');
          }
        });
    }

    $scope.myDelete = function(id) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + id).success(function(data) {
        $location.path('/projects');
      });

    }


  }]);

function unNull(data){
  var champ;
  for(champ in data)
  {
    if (data.champ == null) {
      data.champ = "null";
    }
  }

  return data;
}

function subDate(data){
  data.createdAt = data.createdAt.substring(0,10);
  data.updatedAt = data.createdAt.substring(0,10);
  return data;
}

function nullToNoData(data) {
  return (data == null || data == "")?"{no data}":data;
}
