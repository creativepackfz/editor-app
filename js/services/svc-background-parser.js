'use strict';

angular.module('risevision.editorApp.services')
  .factory('backgroundParser', [

    function () {
      var factory = {};

      var BACKGROUND_TOKENS = {
        RGB: 'rgb',
        URL: 'url',
        LEFT: 'left',
        RIGHT: 'right',
        TOP: 'top',
        MIDDLE: 'middle',
        BOTTOM: 'bottom',
        CENTER: 'center'
      };

      factory.parseBackground = function (backgroundStyle,
        backgroundScaleToFit) {
        var background = {};
        var closingParenthesesPosition;

        if (backgroundStyle) {

          var rgbTokenPosition = backgroundStyle.indexOf(BACKGROUND_TOKENS.RGB);
          if (rgbTokenPosition !== -1) {

            closingParenthesesPosition = backgroundStyle.indexOf(')',
              rgbTokenPosition);
            background.color = backgroundStyle.substring(rgbTokenPosition,
              closingParenthesesPosition + 1);

          } else {

            var urlTokenPosition = backgroundStyle.indexOf(
              BACKGROUND_TOKENS.URL);
            if (urlTokenPosition !== -1) {

              background.useImage = true;
              background.image = {};

              var openingParenthesesPosition = backgroundStyle.indexOf(
                '(\'', urlTokenPosition);
              closingParenthesesPosition = backgroundStyle.indexOf(
                '\')', urlTokenPosition);
              background.image.url = backgroundStyle.substring(
                openingParenthesesPosition + 2,
                closingParenthesesPosition);

              var verticalImagePosition = '';
              if (backgroundStyle.indexOf(BACKGROUND_TOKENS.TOP) !== -1) {
                verticalImagePosition = BACKGROUND_TOKENS.TOP;
              } else if (backgroundStyle.indexOf(BACKGROUND_TOKENS.MIDDLE) !==
                -1) {
                verticalImagePosition = BACKGROUND_TOKENS.MIDDLE;
              } else if (backgroundStyle.indexOf(BACKGROUND_TOKENS.BOTTOM) !==
                -1) {
                verticalImagePosition = BACKGROUND_TOKENS.BOTTOM;
              }

              var horizontalImagePosition = '';
              if (backgroundStyle.indexOf(BACKGROUND_TOKENS.LEFT) !== -1) {
                horizontalImagePosition = BACKGROUND_TOKENS.LEFT;
              } else if (backgroundStyle.indexOf(BACKGROUND_TOKENS.RIGHT) !==
                -1) {
                horizontalImagePosition = BACKGROUND_TOKENS.RIGHT;
              }

              if (verticalImagePosition && horizontalImagePosition) {
                background.image.position = verticalImagePosition + '-' +
                  horizontalImagePosition;
              }

              background.image.scale = backgroundScaleToFit;
            }
          }
        }

        return background;
      };

      factory.getStyle = function (background) {

        var backgroundStyle = '';

        if (background.useImage) {

          var positions = '';
          if (background.image.position) {
            positions = background.image.position.split('-')[1] + ' ' +
              background.image.position.split('-')[0];
          }

          backgroundStyle = 'url(\'' + background.image.url +
            '\') no-repeat ' + positions;

        } else {

          backgroundStyle = background.color;
        }

        return backgroundStyle;
      };

      factory.getScaleToFit = function (background) {

        var backgroundScaleToFit = false;

        if (background.useImage && background.image.scale) {
          backgroundScaleToFit = true;
        }

        return backgroundScaleToFit;
      };

      return factory;
    }
  ]);
