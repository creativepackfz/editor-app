'use strict';

angular.module('risevision.editorApp.directives')
  .directive('toolbar', [ 'placeholdersFactory', '$modal',
    function (placeholdersFactory, $modal) {
      return {
        restrict: 'E',
        templateUrl: "partials/toolbar.html",
        link: function ($scope) {

          $scope.addNewPlaceHolder = function () {
            placeholdersFactory.addNewPlaceHolder();
          }

          $scope.preview = function () {
            //TODO preview
            console.log('preview');
          }

          $scope.openProperties = function () {
            $modal.open({
              templateUrl: 'partials/presentation-properties-modal.html',
              controller: 'PresentationPropertiesModalController'
            });
          }
        } //link()
      };
    }
  ]);
