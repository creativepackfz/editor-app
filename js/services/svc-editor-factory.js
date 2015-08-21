'use strict';

angular.module('risevision.editorApp.services')
  .value('REVISION_STATUS_PUBLISHED', 0)
  .value('REVISION_STATUS_REVISED', 1)
  /*jshint multistr: true */
  .value('DEFAULT_LAYOUT',
    '\
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n\
<html>\n\
\t<head>\n\
\t\t<meta http-equiv="content-type" content="text/html; charset=UTF-8">\n\
\t\t<title></title>\n\
\t</head>\n\
\n\
\t<body style="width:1920px;height:1080px; margin: 0; overflow: hidden;" >\n\
\t</body>\n\
</html>\n'
  )
  .factory('editorFactory', ['$q', '$state', 'presentation',
    'presentationParser', 'presentationTracker', 'VIEWER_URL',
    'REVISION_STATUS_REVISED', 'DEFAULT_LAYOUT',
    function ($q, $state, presentation, presentationParser,
      presentationTracker, VIEWER_URL, REVISION_STATUS_REVISED,
      DEFAULT_LAYOUT) {
      var factory = {};
      var _presentationId;

      var _clearMessages = function () {
        factory.loadingPresentation = false;
        factory.savingPresentation = false;

        factory.errorMessage = '';
        factory.apiError = '';
      };

      factory.newPresentation = function () {
        _presentationId = undefined;

        factory.presentation = {
          layout: DEFAULT_LAYOUT
        };

        presentationParser.parsePresentation(factory.presentation);

        _clearMessages();
      };

      factory.newPresentation();

      factory.getPresentation = function (presentationId) {
        var deferred = $q.defer();

        _clearMessages();
        //load the presentation based on the url param
        _presentationId = presentationId;

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.get(_presentationId)
          .then(function (result) {
            factory.presentation = result.item;

            presentationParser.parsePresentation(factory.presentation);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('get', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });

        return deferred.promise;
      };

      factory.addPresentation = function () {
        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;
        factory.savingPresentation = true;

        presentation.add(factory.presentation)
          .then(function (resp) {
            if (resp && resp.item && resp.item.id) {
              presentationTracker('Presentation Created', resp.item.id,
                resp.item.name);

              $state.go('presentation.details', {
                presentationId: resp.item.id
              });
            }
          })
          .then(null, function (e) {
            _showErrorMessage('add', e);
          })
          .finally(function () {
            factory.loadingPresentation = false;
            factory.savingPresentation = false;
          });
      };

      factory.updatePresentation = function () {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;
        factory.savingPresentation = true;

        presentation.update(_presentationId, factory.presentation)
          .then(function (presentationId) {
            presentationTracker('Presentation Updated', _presentationId,
              factory.presentation.name);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('update', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
            factory.savingPresentation = false;
          });

        return deferred.promise;
      };

      factory.deletePresentation = function () {
        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.delete(_presentationId)
          .then(function () {
            presentationTracker('Presentation Deleted', _presentationId,
              factory.presentation.name);

            factory.presentation = {};

            $state.go('editor.list');
          })
          .then(null, function (e) {
            _showErrorMessage('delete', e);
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });
      };

      factory.isRevised = function () {
        return factory.presentation.revisionStatus ===
          REVISION_STATUS_REVISED;
      };

      factory.publishPresentation = function () {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;
        factory.savingPresentation = true;

        presentation.publish(_presentationId)
          .then(function (presentationId) {
            presentationTracker('Presentation Published', _presentationId,
              factory.presentation.name);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('publish', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
            factory.savingPresentation = false;
          });

        return deferred.promise;
      };

      factory.restorePresentation = function (presentationId) {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.restore(_presentationId)
          .then(function (result) {
            presentationTracker('Presentation Restored', _presentationId,
              factory.presentation.name);
            factory.presentation = result.item;

            presentationParser.parsePresentation(factory.presentation);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('restore', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });

        return deferred.promise;
      };

      factory.getPreviewUrl = function () {
        if (_presentationId) {
          return VIEWER_URL + '/?type=presentation&id=' + _presentationId +
            '&showui=false';
        }
        return null;
      };

      var _showErrorMessage = function (action, e) {
        factory.errorMessage = 'Failed to ' + action + ' Presentation!';
        factory.apiError = e.result.error.message ? e.result.error.message :
          e.result.error.toString();
      };

      return factory;
    }
  ]);
