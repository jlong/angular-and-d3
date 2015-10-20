(function() {
  'use strict';

  angular
    .module('angularAndD3')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party libs here...
  }

})();
