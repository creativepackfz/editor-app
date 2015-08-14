'use strict';
describe('controller: Workspace', function() {
  beforeEach(module('risevision.editorApp.controllers'));
  beforeEach(module('risevision.editorApp.services'));
  beforeEach(module(function ($provide) {
    $provide.factory('editorFactory',function(){
      return { };
    });
  }));
  var $scope;
  beforeEach(function(){


    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();

      $controller('WorkspaceController', {
        $scope : $scope,
        editorFactory: $injector.get('editorFactory')

      });
      $scope.$digest();
    });
  });

  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.factory).to.be.truely;
    expect($scope.factory).to.deep.equal({});
  });
});
