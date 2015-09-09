'use strict';
describe('filter: status', function() {
  beforeEach(module('risevision.editorApp.filters'));
  beforeEach(module(function ($provide) {
    $provide.factory('translateFilter', function(){
      return function(key){
        return translation;
      };
    });
  }));
  var presentationStatus, translation;
  describe('Default', function (){
    beforeEach(function(){
      inject(function($injector, $filter){
        presentationStatus = $filter('presentationStatus',{
          translateFilter: $injector.get('translateFilter')
        });
      });
    });

    it('should exist',function(){
      expect(presentationStatus).to.be.truely;
    });

    it('should default to N/A if revisionStatus is null',function(){
      expect(presentationStatus()).to.equal('N/A');
    });

    it('should default to N/A if revisionStatus is empty',function(){
      expect(presentationStatus("")).to.equal('N/A');
    });
  });

  describe('Published', function (){
    beforeEach(function(){
      translation = "Published";
      inject(function($injector, $filter){
        presentationStatus = $filter('presentationStatus',{
          translateFilter: $injector.get('translateFilter')
        });
      });
    });
    it('should return Published string if revisionStatus is 0',function(done){
      var revisionStatus = 'Published';
      var expectation = "Published";
      setTimeout(function() {
        expect(presentationStatus(revisionStatus)).to.equal(expectation);

        done();
      }, 10);
    });
  });

  describe('Revised', function (){
    beforeEach(function(){
      translation = "Revised";
      inject(function($injector, $filter){
        presentationStatus = $filter('presentationStatus',{
          translateFilter: $injector.get('translateFilter')
        });
      });
    });
    it('should return Revised string if revisionStatus is 1',function(done){
      var revisionStatus = 'Revised';
      var expectation = "Revised";
      setTimeout(function() {
        expect(presentationStatus(revisionStatus)).to.equal(expectation);
        done();
      }, 10);
    });
  });
});
