'use strict';

angular.module('risevision.editorApp.directives')
  .directive('sidebar', [
    function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/sidebar.html'
      };
    }
  ]);
