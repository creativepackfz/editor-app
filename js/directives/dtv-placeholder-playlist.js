'use strict';

angular.module('risevision.editorApp.directives')
  .directive('placeholderPlaylist', ['placeholderPlaylistFactory',
    'widgetModalFactory', '$modal', '$templateCache',
    function (placeholderPlaylistFactory, widgetModalFactory, $modal,
      $templateCache) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/placeholder-playlist.html',
        link: function ($scope) {
          $scope.factory = placeholderPlaylistFactory;
          $scope.widgetModalFactory = widgetModalFactory;
          
          $scope.addContent = function() {
            var modalInstance = $modal.open({
              templateUrl: 'partials/store-products-modal.html',
              size: 'lg',
              controller: 'storeProductsModal'
            });

            modalInstance.result.then(function (productDetails) {
              $scope.playlistItem.objectReference = productDetails[0];
            });
          };

          $scope.edit = function (item) {
            placeholderPlaylistFactory.item = item;
            var modalInstance = $modal.open({
              templateUrl: 'partials/playlist-item-modal.html',
              size: 'md',
              controller: 'PlaylistItemModalController',
              resolve: {
                item: function () {
                  return placeholderPlaylistFactory.getCurrentItemProperties();
                }
              }
            });

            modalInstance.result.then(function (newItemProperties) {
              placeholderPlaylistFactory.setCurrentItemProperties(
                newItemProperties);
            });
          };

          $scope.remove = function (item) {
            var modalInstance = $modal.open({
              template: $templateCache.get(
                'confirm-instance/confirm-modal.html'),
              controller: 'confirmInstance',
              windowClass: 'modal-custom',
              resolve: {
                confirmationTitle: function () {
                  return 'Remove Item';
                },
                confirmationMessage: function () {
                  return 'Are you sure you want to remove ' +
                    'this Content from the Playlist?';
                },
                confirmationButton: function () {
                  return 'Remove';
                },
                cancelButton: null
              }
            });

            modalInstance.result.then(function () {
              placeholderPlaylistFactory.removeItem(item);
            });
          };

        }
      };
    }
  ]);
