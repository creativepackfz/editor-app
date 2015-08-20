'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var PresentationListPage = require('./pages/presentationListPage.js');
var PresentationAddPage = require('./pages/presentationAddPage.js');
var helper = require('rv-common-e2e').helper;

browser.driver.manage().window().setSize(1920, 1080);
describe("In order to manage presentations " +
  "As a user signed in " +
  "I would like to add presentations", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var presentationsListPage;
  var presentationAddPage;

  before(function (){
    homepage = new HomePage();
    presentationsListPage = new PresentationListPage();
    presentationAddPage = new PresentationAddPage();
    commonHeaderPage = new CommonHeaderPage();

    homepage.get();
    //wait for spinner to go away.
    helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
      commonHeaderPage.signin();
    });
    presentationsListPage.getPresentationAddButton().click();
    presentationsListPage.getNewPresentationButton().click();
  });

  it('should show Add Placeholder button',function(){
    expect(presentationAddPage.getAddPlaceholderButton().isPresent()).to.eventually.be.true;
  });

  it('should not show Preview Button',function(){
    expect(presentationAddPage.getPreviewButton().isDisplayed()).to.eventually.be.false;
  });

  it('should not show Publish/Restore/Delete Buttons',function(){
    expect(presentationAddPage.getPublishButton().isDisplayed()).to.eventually.be.false;
    expect(presentationAddPage.getRestoreButton().isDisplayed()).to.eventually.be.false;
    expect(presentationAddPage.getDeleteButton().isDisplayed()).to.eventually.be.false;
  });

  it('should show Save Button',function(){
    expect(presentationAddPage.getSaveButton().isPresent()).to.eventually.be.true;
  });

  it('should show Cancel Button',function(){
    expect(presentationAddPage.getCancelButton().isPresent()).to.eventually.be.true;
  });

  xit('should add presentation',function(){
    var presentationName = 'TEST_E2E_PRESENTATION';
    presentationAddPage.getSaveButton().click();
    helper.wait(presentationAddPage.getDeleteButton(), 'Delete Button');
    expect(presentationAddPage.getDeleteButton().isDisplayed()).to.eventually.be.true;
    expect(presentationAddPage.getPreviewButton().isDisplayed()).to.eventually.be.true;
  });

  // after(function() {
  //   helper.clickWhenClickable(presentationAddPage.getDeleteButton(), "Presentation Delete Button").then(function () {
  //     helper.clickWhenClickable(presentationAddPage.getDeleteForeverButton(), "Presentation Delete Forever Button").then(function () {
  //     });
  //   });
  // });
});
