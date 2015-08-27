'use strict';

angular.module('risevision.editorApp.directives')
  .directive('footer', ['editorFactory', '$modal', '$templateCache',
    function (editorFactory, $modal, $templateCache) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/footerbar.html',
        link: function ($scope) {
          $scope.factory = editorFactory;

          $scope.confirmDelete = function () {
            $scope.modalInstance = $modal.open({
              template: $templateCache.get(
                'confirm-instance/confirm-modal.html'),
              controller: 'confirmInstance',
              windowClass: 'modal-custom',
              resolve: {
                confirmationTitle: function () {
                  return 'Deleting Presentation';
                },
                confirmationMessage: function () {
                  return 'Are you sure you want to delete ' +
                    'this Presentation?';
                },
                confirmationButton: function () {
                  return 'common.delete-forever';
                },
                cancelButton: null
              }
            });

            $scope.modalInstance.result.then(function () {
              editorFactory.deletePresentation();
            });
          };
        }
      };
    }
  ]);
