'use strict';
var PlaceholderSettingsPage = function() {
  var editPlaylistButton = element(by.id('editPlaylistButton'));
  var nameTextbox = element(by.id('itemName'));
  var durationTextbox = element(by.id('itemDuration'));
  
  this.getEditPlaylistButton = function() {
    return editPlaylistButton;
  };
  
  this.getNameTextbox = function() {
    return nameTextbox;
  };
  
  this.getDurationTextbox = function() {
    return durationTextbox;
  };
    
};

module.exports = PlaceholderSettingsPage;
