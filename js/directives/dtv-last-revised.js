(function () {
  "use strict";

  angular.module("risevision.editorApp.directives")
    .directive("lastRevised", [
      function () {
        return {
          restrict: "E",
          scope: {
            revisionStatus: "=",
            changeDate: "=",
            changedBy: "="
          },
          templateUrl: "partials/last-revised.html",
          link: function ($scope) {
            $scope.$watch("revisionStatus", function (newVal) {
              if (newVal === 0) {
                $scope.status = "Published";
              }
              else if (newVal === 1) {
                $scope.status = "Revised";
              }
              else {
                $scope.status = "Saved";
              }
            });
            $scope.$watch("changedBy", function (newVal) {
              $scope.changedBy = newVal ? newVal : "N/A";
            });
          } //link()
        };
      }
    ]);
}());
