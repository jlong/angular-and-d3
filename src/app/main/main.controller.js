(function() {
  'use strict';

  angular
    .module('angularAndD3')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $interval) {
    $scope.simple = [1,2,3,6,2,3,8,2,5,3,4,6,11,4];

    $scope.wide = [1,2,3,1,2,5];

    $scope.updating = [];
    $scope.updatingWidth = 0;

    // Combine unshift and push
    $interval(function tick() {
      if ($scope.updating.length >= 14) {
        $scope.updating.shift();
      } else {
        $scope.updatingWidth = (14 * ($scope.updating.length)) + 8;
      }
      $scope.updating.push(Math.ceil(Math.random() * 10));
    }, 500);
  }
})();
