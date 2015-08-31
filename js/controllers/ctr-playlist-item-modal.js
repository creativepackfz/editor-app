'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('PlaylistItemModalController', ['$scope', '$modalInstance',
    'widgetModalFactory', 'item',
    function ($scope, $modalInstance, widgetModalFactory, item) {
      $scope.widgetModalFactory = widgetModalFactory;
      $scope.item = item;

      $scope.apply = function () {
        $modalInstance.close($scope.item);
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]); //ctr
