'use strict';
var ArtboardPage = function() {
  var artboardContainer = element(by.id('artboard'));

  this.getArtboardContainer = function() {
    return artboardContainer;
  };

  this.getPlaceholderContainer  = function() {
  	return this.getArtboardContainer().element(by.css('artboard-placeholder'));
  };

};

module.exports = ArtboardPage;
