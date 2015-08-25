'use strict';

angular.module('risevision.editorApp.services')
  .factory('presentationPropertiesFactory', ['editorFactory',
    'presentationParser',
    function (editorFactory, presentationParser) {
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

      var _newPresentationProperties = function () {
        return {
          id: '',
          name: 'New Presentation',
          width: 1920,
          height: 1080,
          widthUnits: 'px',
          heightUnits: 'px',
          background: {},
          hidePointer: 'true',
          donePlaceholder: ''
        };
      };

      factory.getPresentationProperties = function () {
        var presentationProperties = _newPresentationProperties();

        if (editorFactory.presentation && editorFactory.presentation.name) {
          presentationProperties.id = editorFactory.presentation.id;
          presentationProperties.name = editorFactory.presentation.name;
          presentationProperties.width = editorFactory.presentation.width;
          presentationProperties.height = editorFactory.presentation.height;
          presentationProperties.widthUnits = editorFactory.presentation.widthUnits;
          presentationProperties.heightUnits = editorFactory.presentation.heightUnits;
          presentationProperties.background = _getBackground(editorFactory.presentation
            .backgroundStyle, editorFactory.presentation.backgroundScaleToFit
          );
          presentationProperties.hidePointer = editorFactory.presentation.hidePointer;
          presentationProperties.donePlaceholder = editorFactory.presentation
            .donePlaceholder;
        }

        return presentationProperties;
      };

      factory.setPresentationProperties = function (presentationProperties) {
        if (presentationProperties) {
          editorFactory.presentation.id = presentationProperties.id;
          editorFactory.presentation.name = presentationProperties.name;
          editorFactory.presentation.width = presentationProperties.width;
          editorFactory.presentation.height = presentationProperties.height;
          editorFactory.presentation.widthUnits = presentationProperties.widthUnits;
          editorFactory.presentation.heightUnits = presentationProperties.heightUnits;
          editorFactory.presentation.backgroundStyle = _getBackgroundStyle(
            presentationProperties.background);
          editorFactory.presentation.backgroundScaleToFit =
            _getBackgroundScaleToFit(presentationProperties.background);
          editorFactory.presentation.hidePointer = presentationProperties.hidePointer;
          editorFactory.presentation.donePlaceholder =
            presentationProperties.donePlaceholder;

          presentationParser.updatePresentation(editorFactory.presentation);
        }
      };

      var _getBackground = function (backgroundStyle, backgroundScaleToFit) {
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

      var _getBackgroundStyle = function (background) {

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

      var _getBackgroundScaleToFit = function (background) {

        var backgroundScaleToFit = false;

        if (background.useImage && background.image.scale) {
          backgroundScaleToFit = true;
        }

        return backgroundScaleToFit;
      };

      return factory;
    }
  ]);
