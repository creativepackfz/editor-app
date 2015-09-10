'use strict';
describe('service: gadgetFactory: ', function() {
  beforeEach(module('risevision.editorApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});

    $provide.service('gadget',function () {
      return {
        _gadget: {
          id: 'gadgetId',
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
        }
      };
    });
  }));
  var gadgetFactory, returnGadget, apiCalls;
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

});
