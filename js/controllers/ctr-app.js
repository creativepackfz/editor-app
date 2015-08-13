'use strict';

angular.module('risevision.editorApp.controllers')
  .controller('AppCtrl', ['$scope',
    function ($scope) {
      $scope.navOptions = [{
        title: 'Presentations',
        link: '#/',
        states: ['root.common.editor']
      }];
      $scope.navSelected = 'root.common.editor';
    }
  ]); //ctr
