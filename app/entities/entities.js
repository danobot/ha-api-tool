'use strict';



app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/entities', {
    templateUrl: 'entities/entities.html',
    controller: 'EntitiesCtrl'
  });
}])


  .controller('EntitiesCtrl', ['$scope', '$http', 'hass', 'CredentialService', function($scope, $http, hass, CredentialService) {
    $scope.domains = ['light', 'group', 'scene', 'automation', 'media_player', 'script'];

    $scope.filter = "";
    $scope.domainFilter = "";
    $scope.domainFilters = [];

    $scope.selectionId;
    $scope.ids = [];
    const status = document.getElementById('status');
    const root = document.getElementById('content');
    $scope.selection;

    CredentialService.subscribe(connectHass);
    connectHass();
    function render(entities) {
      var ent = Object.values(entities).reverse();
      $scope.entities = [];
      for (var i of ent) {
        var data_object = {};

        data_object.id = getID(i.entity_id);
        $scope.ids.push(data_object.id);
        data_object.domain = getDomain(i.entity_id);
        $scope.domains.push(data_object.domain);
        data_object.entity_id = i.entity_id;
        data_object.entity = i;
        $scope.entities.push(Object.assign(data_object));
      }
      ;
      $scope.domains = _.uniq($scope.domains);
      //$scope.domains.push(""); // blank element
      $scope.domains.sort();
      console.log($scope.entities);
      $scope.$apply();
      console.log("New data...");
    }


    function eventCallback(events) {
      console.log("Events", events);
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


    function connectHass() {
      status.innerHTML = 'Reconnecting...';
      HAWS.createConnection('wss://' + CredentialService.getApiUrl() + '/websocket', CredentialService.getHeaders()).then(conn => {
        status.innerHTML = 'Connected';
        HAWS.subscribeEntities(conn, render);
        conn.subscribeEvents(eventCallback);
      }, err => {
        status.innerHTML = `Connection Error (Check Credentials)`;
      });
    }


    $scope.updateState = function(data) {
      console.log("Update state", data);
    }

    var getDomain = function(id) {
      return id.replace(/\.(.*)/g, "");
    }
    var getID = function(id) {
      return id.replace(/(.*)\./g, "");
    }

    $scope.myFilterBy = function(e) {
      var cond = $scope.domainFilters.map(x => x.text).indexOf(e.domain) !== -1 || $scope.domainFilters.length == 0;
      // if (cond) {
      //   console.log(e.domain);
      //   console.log("Condition is met", cond);
      //   console.log($scope.domains.indexOf(e.domain) != 1);
      // }
      return cond; // neet to faltten array.
    }

    $scope.submit = function() {
      console.log("Calling service", $scope.selection);
      hass.updateEntity($scope.selection.entity).success(function(data, status, headers, config) {
        console.log(data);

      }).error(function(data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
      });
    }
  }]);
