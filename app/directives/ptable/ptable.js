app.directive("pTable", [function(){

    return {
      scope: {
        data: '='
      },

      controller: function($scope) {


          console.log("Data:", $scope.data);



      },
      templateUrl: 'directives/ptable/ptable.html'
      // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
    };
}]);
