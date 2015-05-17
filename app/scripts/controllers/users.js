'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UsersCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function (data) {
        $scope.users = data.data;
        $scope.count = data.count;
        //$scope.status = "success";
        //$scope.message = "Success";
      })
      .error(function (data) {
        $scope.status = "danger";
        $scope.message = "Failure";
      });

    if ($routeParams.userId) {
      $routeParams.userId = $routeParams.userId.substr(1);
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentUser = unNull(data.data);
            $scope.currentUser = subDate(data.data);
            $scope.currentUser.email = nullToNoData($scope.currentUser.email);
            $scope.currentUser.website = nullToNoData($scope.currentUser.website);

            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
              .success(function (dataa) {
                if (dataa.status == "success") {

                  $scope.projects = nullToNoData(dataa.data);
                  //$scope.projects[0] = ($scope.projects[0] == null || $scope.projects[0] == "")?"{no project}":$scope.projects[0];

                }
              });
          }
        });
    }


    $scope.myAssign = function (roleName, ProjectId) {
      var putData = new Object();

      if (roleName == null || roleName == "")
      {
        return;
      }
      putData.name = nullToNoData(roleName);

      if (ProjectId == null || ProjectId == "")
      {
        return;
      }

      putData.UserId = $scope.currentUser.id;

      putData.ProjectId = nullToNoData(ProjectId);


      var putJson = JSON.stringify(putData);

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', putJson)
        .success(function(data) {
          if (data.status == "success") {
            $location.path('/users/:' + $scope.currentUser.id);
          }
        });
    }

    $scope.myEdit = function (id, newName, newSurname, newEmail, newWebsite) {
      var putData = new Object();
      putData.name = newName;
      putData.surname = newSurname;
      putData.email = newEmail;
      putData.website = newWebsite;

      var putJson = JSON.stringify(putData);

      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $scope.currentUser.id, putJson)
        .success(function (data) {
          if (data.status == "success") {
            $location.path('/users/:' + $scope.currentUser.id);

          }
        });

    };

    $scope.refresh = function() {
      console.log("entré");
      window.location.reload(true);
    };

    $scope.myAdd = function (newName, newSurname, newEmail, newWebsite) {
      var putData = new Object();

      if (newName == null || newName == "") {
        return;
      }
      putData.name = nullToNoData(newName);

      if (newSurname == null || newSurname == "") {
        return;
      }
      putData.surname = nullToNoData(newSurname);

      putData.email = newEmail;
      putData.website = newWebsite;

      var putJson = JSON.stringify(putData);

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', putJson)
        .success(function (data) {
          if (data.status == "success") {
            $location.path('/users');
          }
        });
    }

    $scope.myDelete = function (id) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + id).success(function (data) {
        $location.path('/users');
      })

    }


  }]);

function unNull(data) {
  var champ;
  for (champ in data) {
    if (data.champ == null) {
      data.champ = "null";
    }
  }

  return data;
}

function subDate(data) {
  data.createdAt = data.createdAt.substring(0, 10);
  data.updatedAt = data.createdAt.substring(0, 10);
  return data;
}

function nullToNoData(data) {
  return (data == null || data == "") ? "{no data}" : data;
}

function myGet() {
  $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
    .success(function (data) {
      $scope.users = data.data;
      $scope.count = data.count;
      //$scope.status = "success";
      //$scope.message = "Success";
    })
    .error(function (data) {
      $scope.status = "danger";
      $scope.message = "Failure";
    });
}


