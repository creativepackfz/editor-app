'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('PlaylistItemModalController', ['$scope', '$modalInstance', 'item',
    function ($scope, $modalInstance, item) {

      $scope.item = item;

      $scope.apply = function () {
        $modalInstance.close($scope.item);
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]); //ctr
