'use strict';
  
describe('service: playlistItemFactory:', function() {
  beforeEach(module('risevision.editorApp.services'));
  beforeEach(module(function ($provide) {
    item = {
      'name': 'item1',
      'duration': '10',
      'type': 'gadget',
      'objectReference': null,
      'index': '0',
      'playUntilDone': 'false',
      'objectData': 'Hello Digital',
      'additionalParams': null,
      'timeDefined': 'false'
    };

    $provide.service('$modal',function(){
      return {
        open : function(obj){
          var deferred = Q.defer();

          openModal = obj.controller;
          currentItem = obj.resolve ? obj.resolve.item() : undefined;

          deferred.resolve({additionalParams: 'updatedParams'});
          
          return {
            result: deferred.promise
          };
        }
      }
    });
    
    $provide.service('gadgetFactory', function() {
      return {
        getGadgetByProduct: function() {
          var deferred = Q.defer();

          deferred.resolve({
            id: 'gadgetId',
            name: 'gadgetName',
            url: 'http://someurl.com/gadget.html'
          });
          
          return deferred.promise;
        }
      };
    });
  }));
  var item, playlistItemFactory, openModal, currentItem;

  beforeEach(function(){
    openModal = null;
    currentItem = null;
    
    inject(function($injector){  
      playlistItemFactory = $injector.get('playlistItemFactory');
      playlistItemFactory.item = item;
    });
  });

  it('should exist',function(){
    expect(playlistItemFactory).to.be.truely;

    expect(playlistItemFactory.add).to.be.a('function');
    expect(playlistItemFactory.edit).to.be.a('function');

  });
  
  it('edit: ', function() {
    playlistItemFactory.edit(item);
    
    expect(openModal).to.equal('PlaylistItemModalController');
    expect(currentItem).to.equal(item);
  });
  
  describe('add: ', function() {
    it('should add new widget', function(done) {
      playlistItemFactory.add();

      expect(openModal).to.equal('storeProductsModal');
      expect(currentItem).to.not.be.ok;

      setTimeout(function() {
        expect(openModal).to.equal('PlaylistItemModalController');
        expect(currentItem).to.deep.equal({
          duration: 10,
          distributeToAll: true,
          timeDefined: false,
          additionalParams: null,
          type: 'widget',
          objectReference: 'gadgetId',
          name: 'gadgetName',
          objectData: 'http://someurl.com/gadget.html'
        });
        
        done();
      }, 10);
    });
  });

});
