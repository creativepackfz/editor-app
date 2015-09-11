'use strict';
describe('service: widgetModalFactory:', function() {
  beforeEach(module('risevision.editorApp.services'));

  beforeEach(module(function ($provide) {
    $provide.service('userState',function(){
      return {
        getSelectedCompanyId : function(){
          return 'someId';
        },
        _restoreState: function() {}
      }
    });
    $provide.service('placeholderFactory', function() {
      return {
        placeholder: {
          width: 100,
          height: 200
        }
      }
    });
    $provide.service('gadgetFactory', function() {
      return {
        getGadget: function() {
          var deferred = Q.defer();
                    
          deferred.resolve({uiUrl: 'http://somewidget/settings.html'});
          
          return deferred.promise;
        }
      }
    });
    $provide.service('$modal',function(){
      return {
        open : function(obj){
          var deferred = Q.defer();

          expect(obj).to.be.truely;
          widgetObj = obj.resolve.widget();

          if(updateParams){
            deferred.resolve({additionalParams: 'updatedParams'});
          }else{
            deferred.reject();
          }
          
          return {
            result: deferred.promise
          };
        }
      }
    });
    $provide.service('$sce', function() {
      return {
        trustAsResourceUrl: function(url) {return url;}
      }
    });
  }));
  
  var widgetModalFactory, item, updateParams, widgetObj;
  beforeEach(function(){
    item = {
      objectReference: '123',
      additionalParams: 'params'
    };
    updateParams = true;

    inject(function($injector){
      widgetModalFactory = $injector.get('widgetModalFactory');
    });
  });

  it('should exist',function(){
    expect(widgetModalFactory).to.be.truely;
    expect(widgetModalFactory.showWidgetModal).to.be.a('function');
  });
  
  it('should initialize url correctly and remove protocol (http)', function(done) {
    widgetModalFactory.showWidgetModal(item);

    setTimeout(function() {
      expect(widgetObj).to.be.ok;

      // TODO: Should find a better way to access value
      expect(widgetObj.$$state.value).to.be.ok;

      expect(widgetObj.$$state.value.additionalParams).to.equal('params');
      expect(widgetObj.$$state.value.url).to.equal('//somewidget/settings.html?up_id=widget-modal-frame&parent=http%3A%2F%2Fserver%2F&up_rsW=100&up_rsH=200&up_companyId=someId');
      
      done();        
    }, 10);  
  });
  
  it('should update additionalParams',function(done){
    widgetModalFactory.showWidgetModal(item);
    
    setTimeout(function() {
      expect(item.additionalParams).to.equal('updatedParams')
      done();
    }, 10);
  });
  
  it('should cancel',function(done){
    updateParams = false;
    
    widgetModalFactory.showWidgetModal(item);
    
    setTimeout(function() {
      expect(item.additionalParams).to.equal('params')
      done();
    }, 10);

  });

});
