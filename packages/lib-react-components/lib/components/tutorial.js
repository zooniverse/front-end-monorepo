'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dialog = require('modal-form/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _mediaCard = require('./media-card');

var _mediaCard2 = _interopRequireDefault(_mediaCard);

var _markdownz = require('markdownz');

var _apiClient = require('panoptes-client/lib/api-client');

var _apiClient2 = _interopRequireDefault(_apiClient);

var _stepThrough = require('../components/step-through');

var _stepThrough2 = _interopRequireDefault(_stepThrough);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var completedThisSession = {};
// TODO fix [window is undefined](https://github.com/zeit/next.js/wiki/FAQ) issue
// if (window && window.tutorialsCompletedThisSession) {
//   window.tutorialsCompletedThisSession = completedThisSession;
// }

var Tutorial = function (_Component) {
  _inherits(Tutorial, _Component);

  function Tutorial(props) {
    _classCallCheck(this, Tutorial);

    var _this = _possibleConstructorReturn(this, (Tutorial.__proto__ || Object.getPrototypeOf(Tutorial)).call(this, props));

    _this.previousActiveElement = document.activeElement;
    _this.handleNextClick = _this.handleNextClick.bind(_this);
    return _this;
  }

  _createClass(Tutorial, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleUnmount();
    }
  }, {
    key: 'handleNextClick',
    value: function handleNextClick() {
      this.stepThrough.goNext();
    }
  }, {
    key: 'handleUnmount',
    value: function handleUnmount() {
      if (this.previousActiveElement.focus) {
        this.previousActiveElement.focus();
      }
      var now = new Date().toISOString();
      completedThisSession[this.props.tutorial.id] = now;

      if (this.props.user) {
        var projectPreferences = this.props.preferences;
        if (!projectPreferences.preferences) {
          projectPreferences.preferences = {};
        };
        if (!projectPreferences.preferences.tutorials_completed_at) {
          projectPreferences.preferences.tutorials_completed_at = {};
        };
        var changes = {};
        changes['preferences.tutorials_completed_at.' + this.props.tutorial.id] = now;
        projectPreferences.update(changes);
        projectPreferences.save();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isIE = 'ActiveXObject' in window;
      var tutorialStyle = void 0;

      if (isIE) {
        tutorialStyle = { height: '85vh' };
      };

      return _react2.default.createElement(
        _stepThrough2.default,
        { ref: function ref(el) {
            _this2.stepThrough = el;
          }, className: 'tutorial-steps', style: tutorialStyle },
        this.props.tutorial.steps.map(function (step, i) {
          if (!step._key) {
            step._key = Math.random();
          };
          var source = void 0;
          var button = void 0;

          if (_this2.props.media[step.media]) {
            source = _this2.props.media[step.media].src;
          };
          if (i === _this2.props.tutorial.steps.length - 1) {
            button = _react2.default.createElement(
              'button',
              { type: 'submit', className: 'major-button' },
              'Let\u2019s go!'
            );
          } else {
            button = _react2.default.createElement(
              'button',
              { type: 'button', className: 'standard-button', onClick: _this2.handleNextClick },
              'Continue'
            );
          }

          return _react2.default.createElement(
            _mediaCard2.default,
            { key: step._key, className: 'tutorial-step', src: source },
            _react2.default.createElement(
              _markdownz.Markdown,
              null,
              step.content
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
              'p',
              null,
              button
            )
          );
        })
      );
    }
  }]);

  return Tutorial;
}(_react.Component);

;

Tutorial.checkIfCompleted = function (tutorial, user, preferences) {
  if (user) {
    window.prefs = preferences;
    if (preferences && preferences.preferences && preferences.preferences.tutorials_completed_at && preferences.preferences.tutorials_completed_at[tutorial.id]) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } else {
    return Promise.resolve(!!completedThisSession[tutorial.id]);
  }
};

Tutorial.startIfNecessary = function (self, tutorial, user, preferences) {
  if (tutorial) {
    self.checkIfCompleted(tutorial, user, preferences).then(function (completed) {
      if (!completed) {
        self.start(self, tutorial, user, preferences);
      }
    });
  }
};

Tutorial.find = function (workflow) {
  if (workflow) {
    return _apiClient2.default.type('tutorials').get({ workflow_id: workflow.id }).then(function (tutorials) {
      var onlyStandardTutorials = tutorials.filter(function (tutorial) {
        return tutorial.kind === 'tutorial' || null;
      });
      return onlyStandardTutorials[0];
    });
  } else {
    return Promise.resolve(false);
  }
};

Tutorial.start = function (TutorialComponent, tutorial, user, preferences) {
  if (tutorial.steps.length !== 0) {
    var awaitTutorialMedia = tutorial.get('attached_images').catch(function () {
      return [];
    }).then(function (mediaResources) {
      var mediaByID = {};

      mediaResources.map(function (mediaResource) {
        mediaByID[mediaResource.id] = mediaResource;
      });
      return mediaByID;
    });

    awaitTutorialMedia.then(function (mediaByID) {
      _dialog2.default.alert(_react2.default.createElement(TutorialComponent, { tutorial: tutorial, media: mediaByID, preferences: preferences, user: user }), {
        className: 'tutorial-dialog',
        required: true,
        closeButton: true
      }).catch(function () {
        return null;
      });
    });
  }
};

Tutorial.propTypes = {
  preferences: _propTypes2.default.shape({
    preferences: _propTypes2.default.object
  }),
  tutorial: _propTypes2.default.shape({
    steps: _propTypes2.default.array
  }),
  user: _propTypes2.default.object
};

Tutorial.defaultProps = {
  media: {},
  preferences: null,
  tutorial: {
    steps: []
  },
  user: null
};

exports.default = Tutorial;