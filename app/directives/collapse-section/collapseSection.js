app.directive("collapseSection", function(){

    return {
      scope: {
        name: '@'
      },
      transclude: true,
      controller: function($scope) {





      },
      templateUrl: 'directives/collapse-section/collapseSection.html'
      // template: '<div {{verb}}="value[key]" buttons="no" e-name="key">{{value[key] | json}}</div>'
    };
});
