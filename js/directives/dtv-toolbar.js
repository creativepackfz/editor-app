'use strict';

angular.module('risevision.editorApp.directives')
  .directive('toolbar', ['editorFactory', 'placeholdersFactory', '$modal',
    function (editorFactory, placeholdersFactory, $modal) {
      return {
        restrict: 'E',
        templateUrl: 'partials/toolbar.html',
        link: function ($scope) {
            $scope.previewUrl = editorFactory.getPreviewUrl();

            $scope.addNewPlaceholder = function () {
              placeholdersFactory.addNewPlaceholder();
            };

            $scope.openProperties = function () {
              $modal.open({
                templateUrl: 'partials/presentation-properties-modal.html',
                controller: 'PresentationPropertiesModalController'
              });
            };
          } //link()
      };
    }
  ]);
