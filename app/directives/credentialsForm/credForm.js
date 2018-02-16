app.directive('credForm', [function() {

  return {
    scope: {

    },

    controller: function($scope, CredentialService) {
      $scope.authToken = "";
      $scope.api_url = "";
      callback();
      function callback() {
        $scope.authToken = CredentialService.getAuthToken();
        $scope.api_url = CredentialService.getApiUrl();

      }
      CredentialService.subscribe(callback);
      $scope.save = function() {
        console.log("Saving Credentials");
        CredentialService.saveCredentials($scope.api_url, $scope.authToken);

      };





    },
    templateUrl: 'directives/credentialsForm/credForm.html'
  // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
  };
}]);
