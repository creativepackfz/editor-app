'use strict';

angular.module('risevision.editorApp.directives')
  .directive('placeholderSettings', ['placeholderFactory',
    function (placeholderFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/placeholder-settings.html',
        link: function ($scope) {
          $scope.factory = placeholderFactory;

        }
      };
    }
  ]);
