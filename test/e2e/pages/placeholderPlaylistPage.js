'use strict';
var PlaceholderPlaylistPage = function() {
  var addContentButton = element(by.id('addContentButton'));
  var playlistItems = element.all(by.repeater('item in factory.getItems()'));
  var moveUpButtons = element.all(by.id('moveUpButton'));
  var moveDownButtons = element.all(by.id('moveDownButton'));
  var removeButtons = element.all(by.id('removeButton'));
  var removeItemButton = element(by.id('confirmForm')).element(by.buttonText('Remove'));
  var duplicateItemButton = element.all(by.id('duplicateButton'));
  var itemNameCells = element.all(by.css('.table-playlist-items .playlist-item-name'));

  this.getAddContentButton = function() {
    return addContentButton;
  }
  
  this.getPlaylistItems = function() {
    return playlistItems;
  };

  this.getMoveUpButtons = function() {
    return moveUpButtons;
  };
  
  this.getMoveDownButtons = function() {
    return moveDownButtons;
  };
  
  this.getRemoveButtons = function() {
    return removeButtons;
  };
  
  this.getRemoveItemButton = function() {
    return removeItemButton;
  };
  
  this.getItemNameCells = function() {
    return itemNameCells;
  };
  
};

module.exports = PlaceholderPlaylistPage;
