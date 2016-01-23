angular.module('baseApp')

  .directive('baseDirective', function() {
    return {
      template: 'Name: Jane Doe Address: 123 Halsted, Chicago',
      //templateUrl: 'templates/directivetemplate.html',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function(scope, element, attrs){
        // stuff that registers DOM listeners
        // and updates the DOM. aka: directive logic
      }

    };
  });
