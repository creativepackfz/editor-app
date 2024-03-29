'use strict';

angular.module('risevision.editorApp.directives')
  .directive('artboardPlaceholder', ['placeholderFactory',
    function (placeholderFactory) {
      return {
        scope: {
          placeholder: '='
        },
        restrict: 'E',
        link: function ($scope, element, attrs) {
            $scope.factory = placeholderFactory;
            element.addClass('ph-block');

            $scope.$watch('placeholder', function () {
              element.css('top', $scope.placeholder.top + $scope.placeholder
                .topUnits);
              element.css('left', $scope.placeholder.left + $scope.placeholder
                .leftUnits);
              element.css('width', $scope.placeholder.width + $scope.placeholder
                .widthUnits);
              element.css('height', $scope.placeholder.height + $scope.placeholder
                .heightUnits);
              element.css('background', $scope.placeholder.backgroundStyle);
              element.css('z-index', $scope.placeholder.zIndex);
            }, true);

            $scope.$watch('factory.placeholder', function () {
              if (placeholderFactory.placeholder === $scope.placeholder) {
                element.css('z-index', 100);
                element.addClass('edit-mode');
              } else {
                element.css('z-index', $scope.placeholder.zIndex);
                element.removeClass('edit-mode');
              }
            }, true);
          } //link()
      };
    }
  ]);
