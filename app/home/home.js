'use strict';



app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])


  .controller('HomeCtrl', ['$scope', 'CredentialService', function($scope, CredentialService) {

    $scope.hasCredentials = CredentialService.hasCredentials();

    $scope.remove = function() {
      CredentialService.remove();

      alert('All credentials removed successfully.');
    }
  }]);
