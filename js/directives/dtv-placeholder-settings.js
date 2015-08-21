'use strict';

angular.module('risevision.editorApp.directives')
  .directive('placeholderPlaylist', ['placeholderFactory',
    function (placeholderFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/placeholder-playlist.html',
        link: function ($scope) {
          $scope.factory = placeholderFactory;

        }
      };
    }
  ]);
