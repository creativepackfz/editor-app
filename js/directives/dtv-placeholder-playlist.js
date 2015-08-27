'use strict';

angular.module('risevision.editorApp.directives')
  .directive('placeholderPlaylist', ['placeholderPlaylistFactory', '$modal',
    '$templateCache',
    function (placeholderPlaylistFactory, $modal, $templateCache) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/placeholder-playlist.html',
        link: function ($scope) {
          $scope.factory = placeholderPlaylistFactory;

          $scope.edit = function(item) {
            placeholderPlaylistFactory.item = item;
            var modalInstance = $modal.open({
              templateUrl: 'partials/playlist-item-modal.html',
              size: 'lg',
              controller: 'PlaylistItemModalController',
              resolve: {
                item: function () {
                  return placeholderPlaylistFactory.getCurrentItemProperties();
                }
              }
            });

            modalInstance.result.then(function (newItemProperties) {
              placeholderPlaylistFactory.setCurrentItemProperties(newItemProperties);
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
