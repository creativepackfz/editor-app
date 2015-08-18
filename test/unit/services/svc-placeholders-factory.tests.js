'use strict';
describe('service: presentation:', function() {
  beforeEach(module('risevision.editorApp.services'));

  var placeholdersFactory;
  beforeEach(function(){
    inject(function($injector){
      placeholdersFactory = $injector.get('placeholdersFactory');
    });
  });

  it('should exist',function(){
    expect(placeholdersFactory).to.be.truely;
    expect(placeholdersFactory.addNewPlaceHolder).to.be.a('function');
  });
});
