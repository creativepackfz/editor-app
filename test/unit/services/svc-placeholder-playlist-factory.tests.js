'use strict';
  
describe('service: placeholderPlaylistFactory:', function() {
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
      'timeDefined': 'false',
      'startDate': null,
      'endDate': null,
      'startTime': null,
      'endTime': null,
      'recurrenceType': 'Daily',
      'recurrenceFrequency': '1',
      'recurrenceAbsolute': 'false',
      'recurrenceDayOfWeek': '0',
      'recurrenceDayOfMonth': '1',
      'recurrenceWeekOfMonth': '0',
      'recurrenceMonthOfYear': '0'
    };
    item0 = {
      name: 'item0'
    };
    item2 = {
      name: 'item2'
    };
    
    items = [item0, item, item2];

    placeholderFactory = {
      placeholder: {
        items: items
      }
    };
    
    $provide.service('placeholderFactory',function () {
      return placeholderFactory;
    });

  }));
  var items, item, item0, item2, placeholderPlaylistFactory, trackerCalled, placeholderFactory;

  beforeEach(function(){
    trackerCalled = undefined;
    
    inject(function($injector){  
      placeholderPlaylistFactory = $injector.get('placeholderPlaylistFactory');
      placeholderPlaylistFactory.item = item;
    });
  });

  it('should exist',function(){
    expect(placeholderPlaylistFactory).to.be.truely;

    expect(placeholderPlaylistFactory.getItems).to.be.a('function');
    expect(placeholderPlaylistFactory.removeItem).to.be.a('function');
    expect(placeholderPlaylistFactory.getCurrentItemProperties).to.be.a('function');
    expect(placeholderPlaylistFactory.setCurrentItemProperties).to.be.a('function');
  });
  
  describe('getItems: ', function() {
    it('should get the items', function() {
      expect(placeholderPlaylistFactory.getItems()).to.equal(items);
    });
    
    it('should initialize items if undefined', function() {
      placeholderFactory.placeholder.items = undefined;
      
      var _items = placeholderPlaylistFactory.getItems();
      
      expect(_items).to.be.a('array');
      expect(_items.length).to.equal(0);
    });

    it('should return undefined if placeholder is undefined', function() {
      placeholderFactory.placeholder = undefined;
      
      var _items = placeholderPlaylistFactory.getItems();
      
      expect(_items).to.equal(undefined);
    });
  });

  describe('removeItem: ',function(){
    it('should remove the item',function(){
      placeholderPlaylistFactory.removeItem(item);

      expect(items.length).to.equal(2);
    });
    
    it('should not remove missing item',function(){
      placeholderPlaylistFactory.removeItem({});

      expect(items.length).to.equal(3);
      expect(items[1]).to.equal(item);    
    });
  });

  describe('getCurrentItemProperties: ',function(){
    it('should get a copy of current item properties',function(){
      var itemProperties = placeholderPlaylistFactory.getCurrentItemProperties();

      expect(itemProperties).to.not.equal(item);
      expect(itemProperties).to.deep.equal(item);
    });  

    it('should return undefined if current item is undefined',function(){
      placeholderPlaylistFactory.item = undefined;

      expect(placeholderPlaylistFactory.getCurrentItemProperties()).to.equal(undefined);
    });
  });  

  describe('setCurrentItemProperties: ',function(){
    it('should set new properties to current item',function(){
      var newProperties = {
          'name': 'New Name',
          'duration': '11',
          'type': 'text',
          'playUntilDone': 'true',
          'timeDefined': 'true',
          'startDate': new Date(),
          'endDate': new Date(),
          'startTime': new Date(),
          'endTime': new Date(),
          'recurrenceType': 'Weekly',
          'recurrenceFrequency': '2',
          'recurrenceAbsolute': 'true',
          'recurrenceDayOfWeek': '1',
          'recurrenceDayOfMonth': '2',
          'recurrenceWeekOfMonth': '1',
          'recurrenceMonthOfYear': '1'
      }
      placeholderPlaylistFactory.setCurrentItemProperties(newProperties);

      expect(item).to.deep.equal(newProperties);
    });  
    
  });



});
