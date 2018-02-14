app.directive("detailSection", [function(){

    return {
      scope: {
        json: '=',
        name: '@'
      },

      controller: function($scope) {


          console.log("Detail Section object:", $scope.json);

          $scope.submitDirective = function()
          {
            submit($scope.json);
          };

      },
      templateUrl: 'directives/detail-section/detailSection.html'
      // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
    };
}]);
