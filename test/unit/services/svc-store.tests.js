'use strict';
describe('service: store:', function() {
  beforeEach(module('risevision.editorApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('userState',function(){
      return {
        getAccessToken : function(){
          return{access_token: 'TEST_TOKEN'};
        },
        getSelectedCompanyId : function(){
          return 'TEST_COMP_ID';
        },
        _restoreState:function(){}
      }
    });

    $provide.service('storeAPILoader',function () {
      return function(){
        var deferred = Q.defer();
                
        deferred.resolve({
          product: {
            list: function(obj){
              expect(obj).to.be.ok;
              
              searchString = obj.search;
              sortString = obj.sort;

              var def = Q.defer();
              if (returnList) {
                def.resolve({
                  result : {
                    nextPageToken : 1,
                    items : [{}]
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            status: function(obj){
              expect(obj).to.be.ok;
              
              var def = Q.defer();
              if (returnStatus) {
                def.resolve({
                  result : {
                    items : [{}]
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            }
          }
        });
        return deferred.promise;
      };
    });

  }));
  var store, returnList, searchString, sortString, returnStatus;
  beforeEach(function(){
    returnList = true;
    returnStatus = true;
    searchString = '';
    sortString='';
    
    inject(function($injector){
      store = $injector.get('store');
    });
  });

  it('should exist',function(){
    expect(store).to.be.truely;
    expect(store.product.list).to.be.a('function');
  });
  
  describe('list:',function(){
    it('should return a list of products',function(done){
      store.product.list({})
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.items).to.be.an.array;
        expect(result.items).to.have.length.above(0);
        done();
      })
      .then(null,done);
    });
    
    it('should create default search string',function(done){
      store.product.list({})
      .then(function(result){
        expect(searchString).to.equal('(visibleTo:ALL OR visibleTo:TEST_COMP_ID) AND (productTag:Content)');

        done();
      })
      .then(null,done);
    });

    it('should set default sort & order',function(done){
      store.product.list({})
        .then(function(result){
          expect(sortString).to.equal('defaultOrderWeight ASC');

          done();
        })
        .then(null,done);
    });

    it('should output a proper search string',function(done){
      store.product.list({query: 'str'})
        .then(function(result){
          expect(searchString).to.equal('(visibleTo:ALL OR visibleTo:TEST_COMP_ID) AND (productTag:Content) AND str');

          done();
        })
        .then(null,done);
    });
    
    it("should handle failure to get list correctly",function(done){
      returnList = false;

      store.product.list({})
      .then(function(products) {
        done(products);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });

  describe('status:',function(){
   it('should return a list of status',function(done){
      store.product.status({})
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.items).to.be.an.array;
        expect(result.items).to.have.length.above(0);
        done();
      })
      .then(null,done);
    });
    
        
    it("should handle failure to get status correctly",function(done){
      returnStatus = false;

      store.product.status({})
      .then(function(products) {
        done(products);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });
  
});
