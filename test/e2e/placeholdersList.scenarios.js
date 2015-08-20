'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var PresentationsListPage = require('./pages/presentationListPage.js');
var PresentationAddPage = require('./pages/presentationAddPage.js');
var PlaceholdersListPage = require('./pages/placeholdersListPage.js');
var helper = require('rv-common-e2e').helper;

browser.driver.manage().window().setSize(1920, 1080);
describe('Add placeholder to presentation: ', function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var presentationsListPage;
  var presentationAddPage;
  var placeholdersListPage;

  before(function (){
    homepage = new HomePage();
    presentationsListPage = new PresentationsListPage();
    presentationAddPage = new PresentationAddPage();
    placeholdersListPage = new PlaceholdersListPage();
    commonHeaderPage = new CommonHeaderPage();

    homepage.get();
    //wait for spinner to go away.
    helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
      commonHeaderPage.signin();
    });
  });

  describe(' Given a user is adding a new presentation and a few placeholders', function() {
    before(function () {
      presentationsListPage.getPresentationAddButton().click();
      presentationsListPage.getNewPresentationButton().click();

      presentationAddPage.getAddPlaceholderButton().click();
      presentationAddPage.getAddPlaceholderButton().click();
    });

    describe('Should manage placeholders', function () {
      it('should have 2 items the list', function () {
        expect(placeholdersListPage.getPlaceholders().count()).to.eventually.equal(2);
        
        expect(placeholdersListPage.getPlaceholders().get(0).getText()).to.eventually.contain('ph0');
        expect(placeholdersListPage.getPlaceholders().get(1).getText()).to.eventually.contain('ph1');
      });
            
      it('should remove item', function (done) {
        placeholdersListPage.getRemoveButtons().get(0).click();

        helper.clickWhenClickable(placeholdersListPage.getRemoveItemButton(), "Remove Item Confirm Button").then(function () {
          expect(placeholdersListPage.getPlaceholders().count()).to.eventually.equal(1);
          
          done();
        });
      });
      
      it('should duplicate item', function() {
        placeholdersListPage.getDuplicateItemButton().get(0).click();
        
        expect(placeholdersListPage.getPlaceholders().count()).to.eventually.equal(2);
      });

      xit('should open properties', function () {
        placeholdersListPage.getPlaceholders().get(0).element(by.tagName('td')).click();
      });
      
      xit('should close properties', function() {

      });
      
    });
  });
});
