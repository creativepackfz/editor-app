'use strict';

angular.module('risevision.editorApp.directives')
  .directive('artboardPresentation', ['editorFactory', 'placeholderFactory',
    function (editorFactory, placeholderFactory) {
      return {
        scope: true,
        restrict: 'E',
        templateUrl: 'partials/artboard-presentation.html',
        link: function ($scope, element, attrs) {
            $scope.presentation = editorFactory.presentation;
            $scope.placeholderFactory = placeholderFactory;
            element.addClass('artboard-presentation');

            $scope.$watch('presentation', function () {
              element.css('width', $scope.presentation.width + $scope.presentation
                .widthUnits);
              element.css('height', $scope.presentation.height + $scope.presentation
                .heightUnits);
              element.css('background', $scope.presentation.backgroundStyle);
            }, true);
          } //link()
      };
    }
  ]);
