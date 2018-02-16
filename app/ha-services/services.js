'use strict';



app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/services', {
    templateUrl: 'ha-services/services.html',
    controller: 'ServicesCtrl'
  });
}]).controller('ServicesCtrl', ['$scope', '$http', 'hass', 'CredentialService', function($scope, $http, hass, CredentialService) {
  $scope.domains = ['light', 'group', 'scene', 'automation', 'media_player', 'script'];

  $scope.service = [];
  CredentialService.subscribe(connect);
  connect();
  const status = document.getElementById('status');
  const root = document.getElementById('content');
  $scope.selection;

  function connect() {

    HAWS.createConnection('wss://' + CredentialService.getApiUrl() + '/websocket', CredentialService.getHeaders()).then(conn => {
      status.innerHTML = 'Connected';
      conn.getServices().then(function serviceCallback(services) {
        console.log("New Event", services);
        $scope.services = Object.assign(services);
        $scope.$apply();
      });
    }, err => {
      status.innerHTML = `Connection Error (Check Credentials)`;
    });

  }
  $scope.select = function(key, subkey, index) {
    $scope.selection = $scope.services[key];
    $scope.key = key;
    $scope.subkey = subkey;
    $scope.selectionId = index;
    // $scope.selection_json = JSON.stringify(item,'\n',4);
    console.log("Item:", $scope.services[key][subkey]);
    console.log("Index:", index);
    console.log("selection:", $scope.selection);
  // tableform.$setPristine();
  }


}]);
