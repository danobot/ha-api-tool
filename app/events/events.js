'use strict';



app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'events/events.html',
    controller: 'EventsCtrl'
  });
}]).controller('EventsCtrl', ['$scope', '$http', 'hass', 'CredentialService', function($scope, $http, hass, CredentialService) {
  $scope.domains = ['light', 'group', 'scene', 'automation', 'media_player', 'script'];
  connect();
  CredentialService.subscribe(connect);
  $scope.events = [];
  $scope.eventCount = 0;
  const status = document.getElementById('status');
  const root = document.getElementById('content');
  $scope.selection;

  function eventCallback(events) {
    console.log("New Event", events);
    $scope.events.push(events);
    $scope.eventCount = $scope.eventCount++;
    $scope.$apply();
  }
  function connect() {

    HAWS.createConnection('wss://' + CredentialService.getApiUrl() + '/websocket', CredentialService.getHeaders()).then(conn => {
      status.innerHTML = 'Connected';
      conn.subscribeEvents(eventCallback);
    }, err => {
      status.innerHTML = `Connection Error (Check Credentials)`;
    });

  }

  $scope.select = function(item, index) {
    $scope.selection = item;
    $scope.selectionId = index;
    // $scope.selection_json = JSON.stringify(item,'\n',4);
    console.log("Item:", item);
    console.log("Index:", index);
    console.log("selection:", $scope.selection);
  // tableform.$setPristine();
  }


}]);
