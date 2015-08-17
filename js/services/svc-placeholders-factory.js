'use strict';

angular.module('risevision.editorApp.services')
  .factory('placeholdersFactory', [
    function () {
      var factory = {};
      var _placeholders = [];

      factory.addNewPlaceHolder = function () {
        //TODO add new Placeholder
        console.log('add new placeholder')
      }

      return factory;
    }
  ]);
