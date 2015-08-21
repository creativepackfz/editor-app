'use strict';

angular.module('risevision.editorApp.services')
  .factory('placeholderFactory', ['$rootScope', 'editorFactory',
    'presentationParser',
    function ($rootScope, editorFactory, presentationParser) {
      var factory = {};

      factory.setPlaceholder = function (placeholder) {
        factory.placeholder = placeholder;
      };

      factory.clearPlaceholder = function () {
        factory.placeholder = undefined;
      };

      $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        if (toState !== 'editor.workspace.artboard') {
          factory.clearPlaceholder();
        }
      });

      return factory;
    }
  ]);
