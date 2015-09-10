'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('PlaylistItemModalController', ['$scope', '$modalInstance',
    'widgetModalFactory', 'gadgetFactory', 'item',
    function ($scope, $modalInstance, widgetModalFactory, gadgetFactory,
      item) {
      $scope.widgetModalFactory = widgetModalFactory;
      $scope.item = item;

      if (item.objectReference && item.type === 'widget') {
        gadgetFactory.getGadget(item.objectReference).then(function (gadget) {
          $scope.widgetName = gadget.name;
        })
      };

      $scope.apply = function () {
        $modalInstance.close($scope.item);
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]); //ctr
