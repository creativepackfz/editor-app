'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('ArtboardController', ['$scope', 'editorFactory',
    function ($scope, editorFactory) {
      $scope.factory = editorFactory;
    }
  ]); //ctr
