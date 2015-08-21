'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('PresentationPropertiesModalController', ['$scope',
    '$modalInstance', 'presentationPropertiesFactory', 'placeholdersFactory',
    'userState',
    function ($scope, $modalInstance, presentationPropertiesFactory,
      placeholdersFactory, userState) {

      $scope.presentationProperties = presentationPropertiesFactory.getPresentationProperties();
      $scope.companyId = userState.getSelectedCompanyId();
      $scope.placeholders = placeholdersFactory.getPlaceholders();

      $scope.apply = function () {
        presentationPropertiesFactory.setPresentationProperties($scope.presentationProperties);
        $scope.dismiss();
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]); //ctr
