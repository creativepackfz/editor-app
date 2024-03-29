'use strict';

angular.module('risevision.editorApp.services')
  .factory('gadgetFactory', ['$q', 'gadget', 'BaseList',
    function ($q, gadget, BaseList) {
      var factory = {};

      var _gadgets = [];
      factory.loadingGadget = false;
      factory.apiError = '';

      var _getGadgetCached = function (gadgetId) {
        var cachedGadget = _.find(_gadgets, {
          id: gadgetId
        });

        return cachedGadget;
      };

      var _updateGadgetCache = function (newGadget) {
        if (!_getGadgetCached(gadget.id)) {
          _gadgets.push(newGadget);
        }
      };

      factory.getGadget = function (gadgetId) {
        var deferred = $q.defer();
        var cachedGadget = _getGadgetCached(gadgetId);

        if (cachedGadget) {
          deferred.resolve(cachedGadget);
        } else {
          //show loading spinner
          factory.loadingGadget = true;

          gadget.get(gadgetId)
            .then(function (result) {
              _updateGadgetCache(result.item);

              deferred.resolve(result.item);
            })
            .then(null, function (e) {
              factory.apiError = e.message ? e.message : e.toString();

              deferred.reject();
            })
            .finally(function () {
              factory.loadingGadget = false;
            });
        }

        return deferred.promise;
      };

      var _getGadgetByProductCached = function (productCode) {
        var cachedGadget = _.find(_gadgets, {
          'productCode': productCode
        });

        return cachedGadget;
      };

      factory.getGadgetByProduct = function (productCode) {
        var deferred = $q.defer();
        var cachedGadget = _getGadgetByProductCached(productCode);

        if (cachedGadget) {
          deferred.resolve(cachedGadget);
        } else {
          //show loading spinner
          factory.loadingGadget = true;

          var search = new BaseList();
          search.productCodes = [productCode];

          gadget.list(search)
            .then(function (result) {
              if (result.items && result.items[0]) {
                _updateGadgetCache(result.items[0]);

                deferred.resolve(result.items[0]);
              } else {
                factory.apiError =
                  'No Gadgets found via the Product Code:' + productCode;

                deferred.reject();
              }
            })
            .then(null, function (e) {
              factory.apiError = e.message ? e.message : e.toString();

              deferred.reject();
            })
            .finally(function () {
              factory.loadingGadget = false;
            });
        }

        return deferred.promise;
      };

      return factory;
    }
  ]);
