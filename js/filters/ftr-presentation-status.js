'use strict';

// Revision Status Filter
angular.module('risevision.editorApp.filters')
  .filter('presentationStatus', ['translateFilter',
    function (translateFilter) {
      return function (revisionStatus) {
        if (revisionStatus === 0) {
          return translateFilter(
            'schedules-app.presentation-modal.presentation-list.status.published'
          );
        } else if (revisionStatus === 1) {
          return translateFilter(
            'schedules-app.presentation-modal.presentation-list.status.revised'
          );
        } else {
          return 'N/A';
        }
      };
    }
  ]);
