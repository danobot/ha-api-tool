app.directive("myDirective", function(){

    return {
      scope: {
        value: '=',
        key: '='
      },

      controller: function($scope) {

          console.log("Key,",$scope.key);
          console.log("Value,",$scope.value[$scope.key]);
          $scope.verb = 'text';
          $scope.tag = 'span';
          $scope.a = JSON.stringify($scope.value[$scope.key]);
          console.log("Stringgified", $scope.a);
            if ($scope.a.match(/\"\d+\"/g))
            {
              $scope.verb = 'number';
            } else if ($scope.a.match(/true|false|True|False/g)) {

              $scope.verb = 'boolean';
              // $scope.value = ($scope.value)?true:false;
            } else if ($scope.a.match(/^\".*\"$/g)) {

              $scope.verb = 'text';

            } else if ($scope.a.match(/\[.*\]/g)) {

              $scope.verb = 'array';

            } else if ($scope.a.match(/\{.*\}/g)) {

              $scope.verb = 'object';

            } else if ($scope.a.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.*/g)) {

              $scope.verb = 'date';
            }
            console.log("Verb: ", $scope.verb);
// $scope.addItem = function()
// {
//   $scope.value.push("");
// }
      },
      templateUrl: 'entities/inputTags.html'
      // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
    };
});
