app.directive('credForm', [function() {

  return {
    scope: {

    },

    controller: function($scope, CredentialService) {
      callback();

      function callback() {
        $scope.authToken = CredentialService.getAuthToken();
        $scope.api_url = CredentialService.getApiUrl();

      }
      CredentialService.subscribe(callback);
      $scope.save = function() {
        console.log("Saving Credentials");
        CredentialService.saveApiUrl($scope.api_url);
        CredentialService.saveAuthToken($scope.authToken);
      };





    },
    templateUrl: 'directives/credentialsForm/credForm.html'
  // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
  };
}]);
