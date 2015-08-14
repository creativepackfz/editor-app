'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('WorkspaceController', ['$scope', 'editorFactory',
    function ($scope, editorFactory) {
      $scope.factory = editorFactory;
    }
  ]); //ctr
