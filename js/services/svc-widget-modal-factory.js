'use strict';

angular.module('risevision.editorApp.services')
  .value('WIDGET_PARAMS',
    '?up_id=iframeId&parent=parentUrl&up_rsW=width&up_rsH=height&up_companyId=cid'
  )
  .factory('widgetModalFactory', ['$rootScope', 'placeholderFactory',
    'userState', '$modal', '$location', '$sce', '$log', 'WIDGET_PARAMS',
    function ($rootScope, placeholderFactory, userState, $modal, $location,
      $sce, $log, WIDGET_PARAMS) {
      var factory = {};

      // TODO: Get settings URL from Gadget Object
      factory.showWidgetModal = function (item) {
        var url = item.objectData.replace('widget.html', 'settings.html') +
          WIDGET_PARAMS
          .replace('cid', userState.getSelectedCompanyId())
          .replace('width', placeholderFactory.placeholder.width)
          .replace('height', placeholderFactory.placeholder.height)
          .replace('iframeId', 'widget-modal-frame')
          .replace('parentUrl', encodeURIComponent($location.$$absUrl));

        var modalInstance = $modal.open({
          templateUrl: 'partials/widget-modal.html',
          controller: 'widgetModal',
          size: 'lg',
          backdrop: true,
          resolve: {
            widget: function () {
              return {
                url: $sce.trustAsResourceUrl(url),
                additionalParams: item.additionalParams
              };
            }
          }
        });

        modalInstance.result.then(function (widgetData) {
          if (widgetData) {
            item.params = widgetData.params;
            item.additionalParams =
              widgetData.additionalParams;
          }

          $log.info('Widget saved:', widgetData);

        }, function () {
          // for unit test purposes
          factory.canceled = true;
        });

      };

      return factory;
    }
  ]);
