'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('PlaylistItemModalController', ['$scope',
    'placeholderPlaylistFactory', 'widgetModalFactory', 'gadgetFactory',
    '$modalInstance', 'item',
    function ($scope, placeholderPlaylistFactory, widgetModalFactory,
      gadgetFactory, $modalInstance, item) {
      $scope.widgetModalFactory = widgetModalFactory;
      $scope.item = angular.copy(item);

      if (item.objectReference && item.type === 'widget') {
        gadgetFactory.getGadget(item.objectReference).then(function (gadget) {
          $scope.widgetName = gadget.name;
        });
      }

      $scope.save = function () {
        angular.copy($scope.item, item);

        placeholderPlaylistFactory.updateItem(item);

        $scope.dismiss();
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]); //ctr
