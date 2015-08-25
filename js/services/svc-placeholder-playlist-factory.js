'use strict';

angular.module('risevision.editorApp.services')
  .factory('placeholderPlaylistFactory', ['placeholderFactory',
    function (placeholderFactory) {
      var factory = {};

      factory.getItems = function () {
        if (!placeholderFactory.placeholder) {
          return undefined;
        } 
        return placeholderFactory.placeholder.items ?
          placeholderFactory.placeholder.items :
          placeholderFactory.placeholder.items = [];
      };

      var _getItemIndex = function (item) {
        return factory.getItems() ?
          factory.getItems().indexOf(item) : -1;
      };

      factory.removeItem = function (item) {
        var index = _getItemIndex(item);
        if (index !== -1) {
          factory.getItems().splice(index, 1);
        }
      };

      return factory;
    }
  ]);
