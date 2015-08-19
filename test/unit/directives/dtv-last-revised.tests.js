'use strict';
describe('directive: last revised', function() {
  beforeEach(module('risevision.editorApp.directives'));

  var elm, $scope, $compile;

  beforeEach(inject(function($rootScope, _$compile_, $templateCache) {
    $templateCache.put('partials/last-revised.html', '<p id="status">{{status}}</p>');
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  function compileDirective() {
    var tpl = '<last-revised revision-status="presentation.revisionStatus" change-date="presentation.changeDate" changed-by="presentation.changedBy"></last-revised>';

    inject(function($compile) {
      elm = $compile(tpl)($scope);
    });

    $scope.$digest();
  }

  it('should compile html', function() {
    compileDirective();

    expect(elm.html()).to.equal('<p id="status" class="ng-binding">Saved</p>');
  });
  
  describe('revisionStatus: ', function() {
    it('should show Revised', function() {
      $scope.presentation = {
        revisionStatus: 1
      };

      compileDirective();
      
      expect(elm.html()).to.equal('<p id="status" class="ng-binding">Revised</p>');
    });

    it('should show Published', function() {
      $scope.presentation = {
        revisionStatus: 0
      };
      
      compileDirective();
      
      expect(elm.html()).to.equal('<p id="status" class="ng-binding">Published</p>');
    });

  });
  
  it('directive scope: ', function() {
    compileDirective();
    
    expect(elm.isolateScope().changedBy).to.equal('N/A');
    expect(elm.isolateScope().status).to.equal('Saved');
  });
});
