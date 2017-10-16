'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSwipe = require('react-swipe');

var _reactSwipe2 = _interopRequireDefault(_reactSwipe);

var _animatedScrollto = require('animated-scrollto');

var _animatedScrollto2 = _interopRequireDefault(_animatedScrollto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StepThrough = function (_Component) {
  _inherits(StepThrough, _Component);

  function StepThrough(props) {
    _classCallCheck(this, StepThrough);

    var _this = _possibleConstructorReturn(this, (StepThrough.__proto__ || Object.getPrototypeOf(StepThrough)).call(this, props));

    _this.goPrevious = _this.goPrevious.bind(_this);
    _this.goNext = _this.goNext.bind(_this);
    _this.goTo = _this.goTo.bind(_this);
    _this.handleStep = _this.handleStep.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.renderControls = _this.renderControls.bind(_this);
    _this.state = {
      render: false,
      step: props.defaultStep
    };
    return _this;
  }

  _createClass(StepThrough, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      addEventListener('keydown', this.handleKeyDown);
      this.swiper.swipe.setup();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'goPrevious',
    value: function goPrevious() {
      this.swiper.swipe.prev();
      this.handleScroll();
    }
  }, {
    key: 'goNext',
    value: function goNext() {
      this.swiper.swipe.next();
      this.handleScroll();
    }
  }, {
    key: 'goTo',
    value: function goTo(index) {
      this.swiper.swipe.slide(index);
      this.handleScroll();
    }
  }, {
    key: 'handleStep',
    value: function handleStep(total, index) {
      this.setState({
        step: (index % total + total) % total
      });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      switch (e.which) {
        // left
        case 37:
          e.preventDefault();
          this.goPrevious();
          break;
        // right
        case 39:
          e.preventDefault();
          this.goNext();
          break;
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var reactSwipeNode = this.swiper;
      setTimeout((0, _animatedScrollto2.default)(reactSwipeNode, reactSwipeNode.offsetTop, 0), 500);
    }
  }, {
    key: 'renderControls',
    value: function renderControls(childrenCount) {
      var _this2 = this;

      if (childrenCount === 1) {
        return null;
      } else {
        var allSteps = Array.from(Array(childrenCount).keys());
        return _react2.default.createElement(
          'div',
          { className: 'step-through-controls' },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'step-through-direction step-through-previous',
              'aria-label': 'Previous step',
              title: 'Previous',
              disabled: this.state.step === 0,
              onClick: this.goPrevious
            },
            '\u25C0'
          ),
          _react2.default.createElement(
            'span',
            { className: 'step-through-pips' },
            allSteps.map(function (thisStep) {
              return _react2.default.createElement(
                'label',
                { key: thisStep, className: 'step-through-pip', title: 'Step ' + (thisStep + 1) },
                _react2.default.createElement('input', {
                  type: 'radio',
                  className: 'step-through-pip-input',
                  'aria-label': 'Step ' + (thisStep + 1) + ' of ' + childrenCount,
                  checked: thisStep === _this2.state.step,
                  autoFocus: thisStep === _this2.state.step,
                  onChange: _this2.goTo.bind(_this2, thisStep)
                }),
                _react2.default.createElement(
                  'span',
                  { className: 'step-through-pip-number' },
                  thisStep + 1
                )
              );
            })
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'step-through-direction step-through-next',
              'aria-label': 'Next step',
              title: 'Next',
              disabled: this.state.step === childrenCount - 1,
              onClick: this.goNext
            },
            '\u25B6'
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _React$createElement;

      var childrenCount = _react2.default.Children.count(this.props.children);
      var swipeOptions = {
        startSlide: this.state.step,
        continuous: false,
        callback: this.handleStep.bind(this, childrenCount)
      };
      return _react2.default.createElement(
        'div',
        (_React$createElement = { className: 'step-through' }, _defineProperty(_React$createElement, 'className', this.props.className), _defineProperty(_React$createElement, 'style', this.props.style), _React$createElement),
        _react2.default.createElement(
          _reactSwipe2.default,
          {
            ref: function ref(el) {
              _this3.swiper = el;
            },
            className: 'step-through-content',
            swipeOptions: swipeOptions
          },
          this.props.children
        ),
        this.renderControls(childrenCount)
      );
    }
  }]);

  return StepThrough;
}(_react.Component);

StepThrough.propTypes = {
  defaultStep: _react2.default.PropTypes.number
};

StepThrough.defaultProps = {
  defaultStep: 0
};

exports.default = StepThrough;