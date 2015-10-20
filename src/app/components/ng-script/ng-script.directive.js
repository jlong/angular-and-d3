(function() {
  'use strict';

  angular
    .module('ngScript', [])
    .directive('script', ngScript);

  function ngScript() {
    return {
      restrict: 'E',
      scope: false,
      link: function($scope, $element, $attrs) {
        if ($attrs.type === 'text/ng-script') {
          var code = $element.text()
          ,    f = new Function(code)
          ;
          f();
        }
      }
    };
  }

})();
