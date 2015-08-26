'use strict';
describe('controller: playlist item modal', function() {
  beforeEach(module('risevision.editorApp.controllers'));
  beforeEach(module(function ($provide) {
    itemProperties = {
      name: 'test'
    };
    $provide.service('$modalInstance',function(){
      return {
        close : function(){
          return;
        },
        dismiss : function(action){
          return;
        }
      }
    });

  }));
  var $scope, $modalInstance, $modalInstanceDismissSpy, $modalInstanceCloseSpy, itemProperties;

  beforeEach(function(){

    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');

      $modalInstanceDismissSpy = sinon.spy($modalInstance, 'dismiss');
      $modalInstanceCloseSpy = sinon.spy($modalInstance, 'close');

      $controller('PlaylistItemModalController', {
        $scope: $scope,
        $modalInstance : $modalInstance,
        item: itemProperties
      });
      $scope.$digest();
    });
  });
  it('should exist',function(){
    expect($scope).to.be.truely;
    expect($scope.apply).to.be.a('function');
    expect($scope.dismiss).to.be.a('function');
  });

  it('should get the item properties',function(){
    expect($scope.item).to.equal(itemProperties);
  });

  it('should set item properties on apply',function(){
    $scope.apply();
    $modalInstanceCloseSpy.should.have.been.calledWith($scope.item);
  });

  it('should dismiss modal when cancel',function(){
    $scope.dismiss();
    $modalInstanceDismissSpy.should.have.been.called;
  });

});
