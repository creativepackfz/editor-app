'use strict';
  
describe('service: backgroundParser:', function() {
  beforeEach(module('risevision.editorApp.services'));
  var backgroundParser;

  beforeEach(function(){
    inject(function($injector){
      backgroundParser = $injector.get('backgroundParser');
    });
  });

  it('should exist',function(){
    expect(backgroundParser).to.be.truely;
    
    expect(backgroundParser.parseBackground).to.be.a('function');

    expect(backgroundParser.getStyle).to.be.a('function');
    expect(backgroundParser.getScaleToFit).to.be.a('function');
  });
  
  describe('parseBackground: ', function() {
    it('should parse new background properties', function() {
      expect(backgroundParser.parseBackground()).to.deep.equal({});
    });

    it('should parse color background', function() {
      expect(backgroundParser.parseBackground('rgba(255,255,255,0)')).to.deep.equal({'color':'rgba(255,255,255,0)'});
    });

    it('should parse background with image background and scale to fit true', function() {
      var background = {'useImage':true,'image':{'url':'/images/bg.jpg','position':'top-left','scale':true}};

      expect(backgroundParser.parseBackground('url(\'/images/bg.jpg\') no-repeat left top', true)).to.deep.equal(background);
    });
    
    it('should parse background with image and color', function() {
      var backgroundString = 'rgb(170, 170, 170) url(\'https://storage.googleapis.com/risemedialibrary-b428b4e8-c8b9-41d5-8a10-b4193c789443/image-1.png\') no-repeat center center';
      var background = {"color":"rgb(170, 170, 170)","useImage":true,"image":{"url":"https://storage.googleapis.com/risemedialibrary-b428b4e8-c8b9-41d5-8a10-b4193c789443/image-1.png","position":"middle-center","scale":true}};
      
      expect(backgroundParser.parseBackground(backgroundString, true)).to.deep.equal(background);
      
    });

    it('should parse image background and without position', function() {
      var background = {'useImage':true,'image':{'url':'/images/bg.jpg','scale':true}};

      expect(backgroundParser.parseBackground('url(\'/images/bg.jpg\') no-repeat', true)).to.deep.equal(background);
    });
  });

  describe('getStyle & getScaleToFit: ', function() {
    it('should get color background', function() {
      expect(backgroundParser.getStyle({'color':'rgba(255,255,255,0)'})).to.deep.equal('rgba(255,255,255,0)');
    });

    it('should get image background and scale to fit true', function() {
      var background = {'useImage':true,'image':{'url':'/images/bg.jpg','position':'top-left','scale':true}};

      expect(backgroundParser.getStyle(background)).to.equal('url(\'/images/bg.jpg\') no-repeat left top');
      expect(backgroundParser.getScaleToFit(background)).to.be.true;

    });
    
    it('should get image & clor background', function() {
      var backgroundString = 'rgb(170, 170, 170) url(\'https://storage.googleapis.com/risemedialibrary-b428b4e8-c8b9-41d5-8a10-b4193c789443/image-1.png\') no-repeat center center';
      var background = {"color":"rgb(170, 170, 170)","useImage":true,"image":{"url":"https://storage.googleapis.com/risemedialibrary-b428b4e8-c8b9-41d5-8a10-b4193c789443/image-1.png","position":"middle-center","scale":true}};
      
      expect(backgroundParser.getStyle(background)).to.equal(backgroundString);
      
    });
    
  });

});
