'use strict';

/*jshint camelcase: false */

angular.module('risevision.editorApp.services')
  .constant('PRESENTAION_WRITABLE_FIELDS', [
    'name'
  ])
  .constant('PRESENTAION_SEARCH_FIELDS', [
    'name', 'id'
  ])
  .service('presentation', ['$q', '$log', 'coreAPILoader', 'userState',
    'pick', 'PRESENTAION_WRITABLE_FIELDS', 'PRESENTAION_SEARCH_FIELDS',
    function ($q, $log, coreAPILoader, userState, pick,
      PRESENTAION_WRITABLE_FIELDS, PRESENTAION_SEARCH_FIELDS) {

      var createSearchQuery = function (fields, search) {
        var query = '';

        for (var i in fields) {
          query += 'OR ' + fields[i] + ':~\'' + search + '\' ';
        }

        query = query.substring(3);

        return query.trim();
      };

      var service = {
        list: function (search, cursor) {
          var deferred = $q.defer();

          var query = search.query ?
            createSearchQuery(PRESENTAION_SEARCH_FIELDS, search.query) :
            '';

          var obj = {
            'companyId': userState.getSelectedCompanyId(),
            'search': query,
            'cursor': cursor,
            'count': search.count,
            'sort': search.sortBy + (search.reverse ? ' desc' : ' asc')
          };
          $log.debug('list presentations called with', obj);
          coreAPILoader().then(function (coreApi) {
              return coreApi.presentation.list(obj);
            })
            .then(function (resp) {
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error('Failed to get list of presentations.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        },
        get: function (presentationId) {
          var deferred = $q.defer();

          var obj = {
            'id': presentationId
          };

          $log.debug('get presentation called with', presentationId);
          coreAPILoader().then(function (coreApi) {
              return coreApi.presentation.get(obj);
            })
            .then(function (resp) {
              $log.debug('get presentation resp', resp);
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error('Failed to get presentation.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        }
      };

      return service;
    }
  ]);
