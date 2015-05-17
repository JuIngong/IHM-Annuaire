'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('RolesCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles')
      .success(function(data) {
        $scope.roles = data.data;
        $scope.count = data.count;
      })
      .error(function(data) {
        $scope.status = "danger";
        $scope.message = "Failure";
      });

    if($routeParams.roleId) {
      $routeParams.roleId = $routeParams.roleId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + $routeParams.roleId)
      .success(function(data) {
        if (data.status == "success") {
          $scope.currentRole = subDate(data.data);
          $scope.currentRole.UserId = nullToNoData($scope.currentRole.UserId);
          $scope.currentRole.ProjectId = nullToNoData($scope.currentRole.ProjectId);


          $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $scope.currentRole.UserId)
            .success(function(data) {
              $scope.usersurname = data.data.surname;
              $scope.username = data.data.name;
            })

          $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $scope.currentRole.ProjectId)
            .success(function(data) {
              $scope.projecttitle = data.data.title;
            })

        }
      });
    }


    $scope.myEdit = function (id, newName, newUserId, newProjectId) {
      var putData = new Object();
      putData.name = newName;
      putData.UserId = newUserId;
      putData.ProjectId = newProjectId;

      var putJson = JSON.stringify(putData);

      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + $scope.currentRole.id, putJson)
        .success(function(data) {
          if (data.status == "success") {
            $location.path('/roles/:' + $scope.currentRole.id);
          }
        });
    }

    $scope.myAdd = function(newName, newUserId, newProjectId) {
      var putData = new Object();

      if (newName == null || newName == "")
      {
        return;
      }
      putData.name = nullToNoData(newName);

      if (newUserId == null || newUserId == "")
      {
        return;
      }
      putData.UserId = nullToNoData(newUserId);

      if (newProjectId == null || newProjectId == "")
      {
        return;
      }
      putData.ProjectId = nullToNoData(newProjectId);

      var putJson = JSON.stringify(putData);

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', putJson)
        .success(function(data) {
          if (data.status == "success") {
            $location.path('/roles');
          }
        });
    }

    $scope.myDelete = function(id) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + id).success(function(data) {
        $location.path('/roles');
      })

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
