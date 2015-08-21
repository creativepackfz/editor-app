'use strict';

angular.module('risevision.editorApp.directives')
  .directive('placeholdersList', ['$modal', '$templateCache',
    'placeholdersFactory', 'placeholderFactory',
    function ($modal, $templateCache, placeholdersFactory,
      placeholderFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/placeholders-list.html',
        link: function ($scope) {
            $scope.factory = placeholdersFactory;

            $scope.manage = function (placeholder) {
              placeholderFactory.setPlaceholder(placeholder);
            };

            $scope.remove = function (placeholder) {
              var modalInstance = $modal.open({
                template: $templateCache.get(
                  'confirm-instance/confirm-modal.html'),
                controller: 'confirmInstance',
                windowClass: 'modal-custom',
                resolve: {
                  confirmationTitle: function () {
                    return 'Remove Placeholder';
                  },
                  confirmationMessage: function () {
                    return 'Are you sure you want to remove ' +
                      'this Placeholder from the Presentation?';
                  },
                  confirmationButton: function () {
                    return 'Remove';
                  },
                  cancelButton: null
                }
              });

              modalInstance.result.then(function () {
                placeholdersFactory.removePlaceholder(placeholder);
              });
            };
          } //link()
      };
    }
  ]);
