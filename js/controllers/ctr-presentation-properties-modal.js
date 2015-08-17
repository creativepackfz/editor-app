'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('PresentationPropertiesModalController', ['$scope', '$modalInstance', 'editorFactory',
    function ($scope, $modalInstance, editorFactory) {
      $scope.factory = editorFactory;

      $scope.apply = function () {
        //TODO Save presentation properties
        $scope.dismiss();
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]); //ctr
