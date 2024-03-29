'use strict';
angular.module('risevision.editorApp.controllers')
  .controller('PresentationListController', ['$scope', '$rootScope',
    'presentation', '$loading', 'BaseList', '$filter',
    function ($scope, $rootScope, presentation, $loading, BaseList, $filter) {
      var DB_MAX_COUNT = 40; //number of records to load at a time

      $scope.presentations = new BaseList(DB_MAX_COUNT);

      $scope.search = {
        sortBy: 'changeDate',
        count: DB_MAX_COUNT,
        reverse: true
      };

      $scope.filterConfig = {
        placeholder: $filter('translate')(
          'schedules-app.presentation-modal.search.placeholder'),
        id: 'presentationSearchInput'
      };

      $scope.$watch('loadingPresentations', function (loading) {
        if (loading) {
          $loading.start('presentation-list-loader');
        } else {
          $loading.stop('presentation-list-loader');
        }
      });

      $scope.load = function () {
        if (!$scope.presentations.list.length || !$scope.presentations.endOfList &&
          $scope.presentations.cursor) {
          $scope.loadingPresentations = true;

          presentation.list($scope.search, $scope.presentations.cursor)
            .then(function (result) {
              $scope.presentations.add(result.items ? result.items : [],
                result.cursor);
            })
            .then(null, function (e) {
              $scope.error =
                'Failed to load presentations. Please try again later.';
            })
            .finally(function () {
              $scope.loadingPresentations = false;
            });
        }
      };

      $scope.load();

      $scope.sortBy = function (cat) {
        $scope.presentations.clear();

        if (cat !== $scope.search.sortBy) {
          $scope.search.sortBy = cat;
          $scope.search.reverse = false;
        } else {
          $scope.search.reverse = !$scope.search.reverse;
        }

        $scope.load();
      };

      $scope.doSearch = function () {
        $scope.presentations.clear();

        $scope.load();
      };
    }
  ]);
