'use strict';
describe('service: gadgetFactory: ', function() {
  beforeEach(module('risevision.editorApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});

    $provide.service('gadget',function () {
      return {
        _gadget: {
          id: 'gadgetId',
          productCode: 'productCode',
          name: 'some gadget',
          revisionStatus: 0
        },
        get: function(gadgetId) {
          var deferred = Q.defer();
          if(returnGadget){
            apiCalls++;
            deferred.resolve({item: this._gadget});
          }else{
            deferred.reject('ERROR; could not get gadget');
          }
          return deferred.promise;
        },
        list: function(productCode) {
          var deferred = Q.defer();
          if(returnGadget){
            apiCalls++;
            deferred.resolve({items: [this._gadget]});
          }else{
            deferred.reject('ERROR; could not get gadget');
          }
          return deferred.promise;
        }
      };
    });

    $provide.service('subscriptionStatusFactory',function () {
      return {
        checkProductCodes: function(productCodes) {
          var deferred = Q.defer(); 
          if(statusError){
            deferred.reject('ERROR; could not get subscription status');
          } else {
            deferred.resolve([
              {pc:'productCode', status: 'Free'}
            ]);  
          }          
          return deferred.promise;
        }
      }
    });
  }));
  var gadgetFactory, returnGadget, apiCalls, statusError;
  beforeEach(function(){
    returnGadget = true;
    apiCalls = 0;
    
    inject(function($injector){  
      gadgetFactory = $injector.get('gadgetFactory');
    });
  });

  it('should exist',function(){
    expect(gadgetFactory).to.be.truely;
    
    expect(gadgetFactory.loadingGadget).to.be.false;

    expect(gadgetFactory.getGadget).to.be.a('function');
    expect(gadgetFactory.getGadgetByProduct).to.be.a('function');
  });
    
  describe('getGadget: ', function(){
    it('should get the gadget',function(done){
      gadgetFactory.getGadget('gadgetId')
      .then(function(gadget) {
        expect(gadget).to.be.truely;
        expect(gadget.name).to.equal('some gadget');

        setTimeout(function() {
          expect(gadgetFactory.loadingGadget).to.be.false;

          done();
        }, 10);
      })
      .then(null, function() {
        done('error');
      })
      .then(null,done);
    });
    
    it('should handle failure to get gadget correctly',function(done){
      returnGadget = false;
      
      gadgetFactory.getGadget()
      .then(function(result) {
        done(result);
      })
      .then(null, function() {
        expect(gadgetFactory.apiError).to.be.truely;
        expect(gadgetFactory.apiError).to.equal('ERROR; could not get gadget');

        setTimeout(function() {
          expect(gadgetFactory.loadingGadget).to.be.false;

          done();
        }, 10);
      })
      .then(null,done);
    });

    it('should only call API once', function(done) {
      gadgetFactory.getGadget('gadgetId');
      
      setTimeout(function() {
        gadgetFactory.getGadget('gadgetId');
        
        setTimeout(function() {
          expect(apiCalls).to.equal(1);
          
          done();
        }, 10);
      }, 10);
    });
  });

  describe('getGadgetByProduct: ', function(){
    it('should get the gadget',function(done){
      gadgetFactory.getGadgetByProduct('productCode')
      .then(function(gadget) {
        expect(gadget).to.be.truely;
        expect(gadget.name).to.equal('some gadget');

        setTimeout(function() {
          expect(gadgetFactory.loadingGadget).to.be.false;

          done();
        }, 10);
      })
      .then(null, function() {
        done('error');
      })
      .then(null,done);
    });
    
    it('should handle failure to get gadget correctly',function(done){
      returnGadget = false;
      
      gadgetFactory.getGadget()
      .then(function(result) {
        done(result);
      })
      .then(null, function() {
        expect(gadgetFactory.apiError).to.be.truely;
        expect(gadgetFactory.apiError).to.equal('ERROR; could not get gadget');

        setTimeout(function() {
          expect(gadgetFactory.loadingGadget).to.be.false;

          done();
        }, 10);
      })
      .then(null,done);
    });

    it('should only call API once', function(done) {
      gadgetFactory.getGadgetByProduct('productCode');
      
      setTimeout(function() {
        gadgetFactory.getGadgetByProduct('productCode');
        
        setTimeout(function() {
          expect(apiCalls).to.equal(1);
          
          done();
        }, 10);
      }, 10);
    });
  });

describe('getGadgets: ', function(){
    it('should get the gadgets',function(done){
      gadgetFactory.getGadgets(['gadgetId'])
      .then(function(gadgets) {
        expect(gadgets).to.be.truely;
        expect(gadgets.length).to.equal(1);
        expect(gadgets[0].name).to.equal('some gadget');

        setTimeout(function() {
          expect(gadgetFactory.loadingGadget).to.be.false;

          done();
        }, 10);
      })
      .then(null, function() {
        done('error');
      })
      .then(null,done);
    });
    
    it('should handle failure to get gadgets correctly',function(done){
      returnGadget = false;
      
      gadgetFactory.getGadgets(['gadgetId'])
      .then(function(result) {
        done(result);
      })
      .then(null, function() {
        expect(gadgetFactory.apiError).to.be.truely;
        expect(gadgetFactory.apiError).to.equal('ERROR; could not get gadget');

        setTimeout(function() {
          expect(gadgetFactory.loadingGadget).to.be.false;

          done();
        }, 10);
      })
      .then(null,done);
    });

    it('should cache API calls', function(done) {
      gadgetFactory.getGadgets(['gadgetId']);
      
      setTimeout(function() {
        gadgetFactory.getGadgets(['gadgetId']);
        
        setTimeout(function() {
          expect(apiCalls).to.equal(1);
          
          done();
        }, 10);
      }, 10);
    });
  });

describe('updateSubscriptionStatus:', function(){  
  it('should return the gadgets with updated subscriptionStatus',function(done){
    gadgetFactory.updateSubscriptionStatus(['gadgetId']).then(function(gadgets){
      expect(gadgets.length).to.equal(1);
      expect(gadgets[0].id).to.equal('gadgetId');
      expect(gadgets[0].subscriptionStatus).to.equal('Free');
      done();
    });  
  });
  it('should handle gadget API errors',function(done){
    returnGadget = false;
    gadgetFactory.updateSubscriptionStatus(['gadgetId'])
      .then(null,function(error){
        expect(gadgetFactory.apiError).to.be.truely;
        expect(gadgetFactory.apiError).to.equal('ERROR; could not get gadget');
        done();
      });    
  });

  it('should handle subscription Status API errors',function(done){
    statusError = true;
    gadgetFactory.updateSubscriptionStatus(['gadgetId']).then(null,function(error){
      expect(gadgetFactory.apiError).to.be.truely;
      expect(gadgetFactory.apiError).to.equal('ERROR; could not get subscription status');
      done();
    });    
  });
})

});
