'use strict';
var PresentationAddPage = function() {
  var presentationsAppContainer = element(by.css('.presentations-app'));

  var addPlaceholderButton = element(by.id('addPlaceholderButton'));
  var previewButton = element(by.id('previewButton'));

  var saveButton = element(by.id('saveButton'));
  var cancelButton = element(by.id('cancelButton'));
  var deleteButton = element(by.id('deleteButton'));
  var restoreButton = element(by.id('restoreButton'));
  var publishButton = element(by.id('publishButton'));
  var deleteForeverButton = element(by.buttonText('Delete Forever'));

  var errorBox = element(by.id('errorBox'));

  var presentationLoader = element(by.xpath('//div[@spinner-key="presentation-loader"]'));

  this.getPresentationsAppContainer = function() {
    return presentationsAppContainer;
  };

  this.getPreviewButton = function() {
    return previewButton;
  };

  this.getSaveButton = function() {
    return saveButton;
  };

  this.getCancelButton = function() {
    return cancelButton;
  };

  this.getDeleteButton = function() {
    return deleteButton;
  };

  this.getRestoreButton = function() {
    return restoreButton;
  };

  this.getPublishButton = function() {
    return publishButton;
  };

  this.getDeleteForeverButton = function() {
    return deleteForeverButton;
  };

  this.getAddPlaceholderButton = function() {
    return addPlaceholderButton;
  };

  this.getErrorBox = function () {
    return errorBox;
  };

  this.getPresentationLoader = function () {
    return presentationLoader;
  };

};

module.exports = PresentationAddPage;
