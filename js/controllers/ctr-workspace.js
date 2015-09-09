'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('WorkspaceController', ['$scope', 'editorFactory', 'placeholderFactory',
    function ($scope, editorFactory, placeholderFactory) {
      $scope.factory = editorFactory;
      $scope.placeholderFactory = placeholderFactory;
    }
  ]); //ctr
