(function () {
  'use strict';

  angular.module('risevision.editorApp.directives')
    .directive('lastRevised', [
      function () {
        return {
          restrict: 'E',
          scope: {
            revisionStatusName: '=',
            changeDate: '=',
            changedBy: '='
          },
          templateUrl: 'partials/last-revised.html',
          link: function ($scope) {
              $scope.$watch('revisionStatusName', function (newVal) {
                if (newVal === 'Published') {
                  $scope.status = 'Published';
                } else if (newVal === 'Revised') {
                  $scope.status = 'Revised';
                } else {
                  $scope.status = 'Saved';
                }
              });
              $scope.$watch('changedBy', function (newVal) {
                $scope.changedBy = newVal ? newVal : 'N/A';
              });
            } //link()
        };
      }
    ]);
}());
