app.directive("footer", [function(){

    return {
      scope: {
        status: '='
      },

      controller: function($scope) {


          console.log("Data:", $scope.status);



      },
      templateUrl: 'directives/footer/footer.html'
      // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
    };
}]);
