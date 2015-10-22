(function() {
  'use strict';

  angular
    .module('barChart', [])
    .directive('barChart', barChart)
  ;

  /** @ngInject */
  function barChart(d3) {
    return {
      restrict: 'E',

      scope: {
        'series': '=',
        'width': '=',
        'height': '=',
        'barWidth': '=',
        'barColor': '@'
      },

      link: function($scope, $element) {

        // Select the element
        var chart = d3.select($element[0]);

        // Create the SVG
        var svg = chart.append('svg');

        // Function to help us set default values
        function value(actualValue, defaultValue) {
          return actualValue !== undefined ? actualValue : defaultValue;
        }

        // Our update function
        function update() {

          // Load scope variables with defaults
          var series = value($scope.series, [])
          ,   width = value($scope.width, 190)
          ,   height = value($scope.height, 80)
          ,   barColor = value($scope.barColor, 'dodgerblue')
          ,   barWidth = value($scope.barWidth, 8)
          ;

          // Let's just make the math easier
          var halfBar = barWidth / 2;

          // Calculate max, min, and length
          var max = d3.max(series)
          ,   min = d3.min([0].concat(series))
          ,   length = series.length
          ;

          // Create scales to help us with the math
          var x = d3.scale.linear()
            .domain([0, length - 1])
            .range([halfBar, width - halfBar])
          ;
          var y = d3.scale.linear()
            .domain([min, max])
            .range([0, height])
          ;

          // Adjust width and height
          svg
            .attr('width', width)
            .attr('height', height)
          ;

          // D3 update pattern:

          // 1) Bind/rebind the data
          var selection = svg.selectAll('rect')
            .data(series)
          ;

          // 2) Add new bars if needed
          selection.enter()
            .append('rect')
              .attr('width', barWidth)
              .attr('fill', barColor)
          ;

          // 3) Update the size and position of all bars
          selection
            .attr('x', function(d, i) { return x(i) - halfBar })
            .attr('y', function(d) { return y(max) - y(d || 0) })
            .attr('height', function(d) { return y(d || 0) })
          ;

          // 4) Remove any unneeded bars
          selection.exit()
            .remove()
          ;
        }

        // Watch for changes
        $scope.$watch(update);
      }
    };
  }
})();
