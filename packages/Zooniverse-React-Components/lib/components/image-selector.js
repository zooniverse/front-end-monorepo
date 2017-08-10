'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataUriToBlob = require('data-uri-to-blob');

var _dataUriToBlob2 = _interopRequireDefault(_dataUriToBlob);

var _fileButton = require('./file-button');

var _fileButton2 = _interopRequireDefault(_fileButton);

var _thumbnail = require('./thumbnail');

var _thumbnail2 = _interopRequireDefault(_thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageSelector = function (_React$Component) {
  _inherits(ImageSelector, _React$Component);

  function ImageSelector(props) {
    _classCallCheck(this, ImageSelector);

    var _this = _possibleConstructorReturn(this, (ImageSelector.__proto__ || Object.getPrototypeOf(ImageSelector)).call(this, props));

    _this.state = {
      working: false
    };

    _this.cropImage = _this.cropImage.bind(_this);
    _this.reduceImage = _this.reduceImage.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(ImageSelector, [{
    key: 'cropImage',
    value: function cropImage(srcImg, srcFile) {
      var _this2 = this;

      var canvas = document.createElement('canvas');
      canvas.width = srcImg.naturalWidth;
      canvas.height = srcImg.naturalHeight;

      if (!isNaN(this.props.ratio)) {
        var naturalRatio = srcImg.naturalWidth / srcImg.naturalHeight;
        if (naturalRatio - this.props.ratio < 0) {
          canvas.height = canvas.width / this.props.ratio;
        } else {
          canvas.width = canvas.height * this.props.ratio;
        }
      }
      var ctx = canvas.getContext('2d');
      ctx.drawImage(srcImg, (srcImg.naturalWidth - canvas.width) / -2, (srcImg.naturalHeight - canvas.height) / -2);

      var croppedImg = new Image();
      croppedImg.onload = function () {
        _this2.reduceImage(croppedImg, srcFile);
      };
      croppedImg.src = canvas.toDataURL();
    }
  }, {
    key: 'reduceImage',
    value: function reduceImage(img, srcFile) {
      var _scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth * _scale;
      canvas.height = img.naturalHeight * _scale;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);

      var dataURL = canvas.toDataURL(srcFile.type);

      try {
        var size = dataURL.split(';base64,')[1].length * this.props.baseExpansion;

        if (size > this.props.maxSize && canvas.width * canvas.height > this.props.minArea) {
          // Keep trying until it's small enough.
          this.reduceImage(img, srcFile, _scale - this.props.reductionPerPass);
        } else {
          this.setState({ working: false });

          img.title = srcFile.name;
          if (window.navigator) {
            this.props.onChange(this.props.resourceType, (0, _dataUriToBlob2.default)(dataURL), img);
          } else {
            this.props.onChange(this.props.resourceType, img);
          }
        }
      } catch (e) {
        this.setState({ working: false });

        alert('Error reducing image. Try a smaller one.');
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _this3 = this;

      // TODO: why is the proxy event in an array?
      if (e[0].target.files.length !== 0) {
        var _e$0$target$files = _slicedToArray(e[0].target.files, 1),
            file = _e$0$target$files[0];

        this.setState({ working: true });

        var reader = new FileReader();
        reader.onload = function (event) {
          var img = new Image();
          img.onload = function () {
            _this3.cropImage(img, file);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO: Add prop to switch from using the FileButton to a button
      // that triggers modal with a media selection view of already uploaded attached images.
      // This would be for reuse with projects when they get added to pfe-lab
      var uploaderClass = this.props.resourceSrc ? 'image-selector__uploader--without-border' : 'image-selector__uploader';

      return _react2.default.createElement(
        'div',
        { className: 'image-selector' },
        this.props.label && _react2.default.createElement(
          'p',
          { className: 'image-selector__label' },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { className: uploaderClass },
          _react2.default.createElement(_fileButton2.default, { accept: 'image/*', onSelect: this.handleChange, rootStyle: { position: "absolute" }, disabled: this.state.working }),
          !this.props.resourceSrc && !this.state.working && _react2.default.createElement(
            'p',
            { className: 'image-selector__placeholder' },
            'Drop an image here'
          ),
          this.props.resourceSrc && _react2.default.createElement(
            'div',
            { className: 'image-selector__thumbnail' },
            _react2.default.createElement(_thumbnail2.default, { src: this.props.resourceSrc, width: 160 }),
            this.props.allowDelete && _react2.default.createElement(
              'button',
              {
                type: 'button',
                'aria-label': 'Delete',
                className: 'image-selector__delete-button',
                disabled: this.props.deleting,
                onClick: this.props.onDelete.bind(null, this.props.resourceType)
              },
              '\xD7'
            )
          ),
          this.state.working && _react2.default.createElement(
            'p',
            { className: 'image-selector__loader' },
            this.props.loading
          )
        )
      );
    }
  }]);

  return ImageSelector;
}(_react2.default.Component);

ImageSelector.propTypes = {
  allowDelete: _propTypes2.default.bool,
  baseExpansion: _propTypes2.default.number,
  deleting: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  loading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  minArea: _propTypes2.default.number,
  maxSize: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired,
  onDelete: _propTypes2.default.func,
  ratio: _propTypes2.default.number,
  reductionPerPass: _propTypes2.default.number,
  resourceSrc: _propTypes2.default.string.isRequired,
  resourceType: _propTypes2.default.string
};

ImageSelector.defaultProps = {
  allowDelete: false,
  baseExpansion: 3 / 4,
  deleting: false,
  loading: 'Loading...',
  maxSize: Infinity,
  minArea: 300,
  onChange: function onChange() {},
  onDelete: function onDelete() {},
  reductionPerPass: 0.05,
  resourceSrc: '',
  ratio: NaN
};

exports.default = ImageSelector;