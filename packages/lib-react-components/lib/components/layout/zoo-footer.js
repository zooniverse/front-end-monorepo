'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Footer = require('grommet/components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Section = require('grommet/components/Section');

var _Section2 = _interopRequireDefault(_Section);

var _Columns = require('grommet/components/Columns');

var _Columns2 = _interopRequireDefault(_Columns);

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Anchor = require('grommet/components/Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Image = require('grommet/components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _SocialFacebookOption = require('grommet/components/icons/base/SocialFacebookOption');

var _SocialFacebookOption2 = _interopRequireDefault(_SocialFacebookOption);

var _SocialTwitter = require('grommet/components/icons/base/SocialTwitter');

var _SocialTwitter2 = _interopRequireDefault(_SocialTwitter);

var _SocialInstagram = require('grommet/components/icons/base/SocialInstagram');

var _SocialInstagram2 = _interopRequireDefault(_SocialInstagram);

var _zooniverseLogotype = require('../zooniverse-logotype');

var _zooniverseLogotype2 = _interopRequireDefault(_zooniverseLogotype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZooFooter = function ZooFooter(props) {
  var createKeyedAnchorItem = function createKeyedAnchorItem(navItem, i) {
    return _react2.default.createElement(
      'span',
      { key: 'navItem-' + i },
      navItem
    );
  };

  return _react2.default.createElement(
    _Footer2.default,
    {
      className: 'footer',
      direction: 'column',
      size: 'large',
      primary: true,
      colorIndex: props.mainSectionColorIndex,
      pad: { horizontal: 'none', vertical: 'none' }
    },
    _react2.default.createElement(
      _Section2.default,
      {
        className: 'footer__section',
        full: 'horizontal',
        direction: 'row',
        justify: 'between',
        pad: { horizontal: 'large', vertical: 'medium' },
        margin: { horizontal: 'large', vertical: 'none' }
      },
      props.homeLogoDiv,
      _react2.default.createElement(
        _Menu2.default,
        { className: 'footer__nav', direction: 'row', inline: true, responsive: false },
        props.socialNavList.map(function (navItem, i) {
          return createKeyedAnchorItem(navItem, i);
        })
      )
    ),
    _react2.default.createElement(
      _Section2.default,
      { pad: { horizontal: 'large', vertical: 'none' }, full: 'horizontal' },
      _react2.default.createElement('hr', { className: 'footer__divider' })
    ),
    _react2.default.createElement(
      _Section2.default,
      {
        direction: 'row',
        className: 'footer__section',
        pad: { horizontal: 'large', vertical: 'medium' },
        margin: { top: 'none', bottom: 'large', left: 'none', right: 'none' }
      },
      _react2.default.createElement(
        _Columns2.default,
        { maxCount: 6, masonry: true, size: 'small' },
        _react2.default.createElement(
          _Menu2.default,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.projectNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _Menu2.default,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.aboutNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _Menu2.default,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.getInvolvedNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _Menu2.default,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.talkNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _Menu2.default,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.buildNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _Menu2.default,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.newsNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        )
      )
    ),
    _react2.default.createElement(
      _Section2.default,
      {
        align: 'center',
        className: 'footer__section--small',
        colorIndex: props.smallSectionColorIndex,
        direction: 'row',
        full: 'horizontal',
        pad: { horizontal: 'large', vertical: 'none' },
        justify: 'between'
      },
      _react2.default.createElement(
        _Menu2.default,
        { className: 'footer__nav', direction: 'row', inline: true, responsive: false },
        props.policyNavList.map(function (navItem, i) {
          return createKeyedAnchorItem(navItem, i);
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        props.adminContainer,
        _react2.default.createElement(_Image2.default, { className: 'footer__easter-egg', src: 'https://s3.amazonaws.com/zooniverse-static/assets/penguin.png', alt: '' })
      )
    )
  );
};

ZooFooter.defaultProps = {
  aboutNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-header', href: 'https://www.zooniverse.org/about' },
    'About'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/about/publications' },
    'Publications'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/about/team' },
    'Team'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/about/acknowledgements' },
    'Acknowledgements'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/about/contact' },
    'Contact'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/about/faq' },
    'FAQ'
  )],
  adminContainer: null,
  buildNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-header', href: 'https://www.zooniverse.org/lab' },
    'Build a Project'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/help' },
    'Tutorial'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/help/glossary' },
    'Glossary'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/help/lab-policies' },
    'Policies'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/lab-best-practices/introduction' },
    'Best Practices'
  )],
  getInvolvedNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-header', href: 'https://www.zooniverse.org/get-involved' },
    'Get Involved'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/get-involved/education' },
    'Education'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/get-involved/call-for-projects' },
    'Call for Projects'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/collections' },
    'Collections'
  )],
  homeLogoDiv: _react2.default.createElement(
    'div',
    { className: 'footer__logo' },
    _react2.default.createElement(
      _Anchor2.default,
      { href: 'https://www.zooniverse.org' },
      _react2.default.createElement(_zooniverseLogotype2.default, null)
    ),
    _react2.default.createElement('br', null),
    'People Powered Research'
  ),
  mainSectionColorIndex: "light-1",
  newsNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-header', href: '#' },
    'News'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://daily.zooniverse.org/' },
    'Daily Zooniverse'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://blog.zooniverse.org/projects' },
    'Blog'
  )],
  policyNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/privacy' },
    'Privacy Policy'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'http://jobs.zooniverse.org/' },
    'Jobs'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://status.zooniverse.org/' },
    'System Status'
  ), _react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-item', href: 'https://www.zooniverse.org/security' },
    'Security'
  )],
  projectNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-header', href: 'https://www.zooniverse.org/projects' },
    'Projects'
  )],
  smallSectionColorIndex: "light-2",
  socialNavList: [
  // Button with an href behaves like an Anchor.
  // Buttons have to be used because Icons used in Anchors in a Box (or things that are sub-classes of a Box) that has its colorIndex set wiill be opinionated.
  // The styles for a Box in that case will supercede the colorIndex set on the Icon.
  // However there is a related bug: https://github.com/grommet/grommet/issues/1513
  _react2.default.createElement(
    _Button2.default,
    { className: 'nav__list-item--social-media', href: 'https://www.facebook.com/therealzooniverse', a11yTitle: 'Facebook' },
    _react2.default.createElement(_SocialFacebookOption2.default, { colorIndex: 'brand', size: 'small' }),
    ' '
  ), _react2.default.createElement(
    _Button2.default,
    { className: 'nav__list-item--social-media', href: 'https://twitter.com/the_zooniverse', a11yTitle: 'Twitter' },
    _react2.default.createElement(_SocialTwitter2.default, { colorIndex: 'brand', size: 'small' })
  ), _react2.default.createElement(
    _Button2.default,
    { className: 'nav__list-item--social-media', href: 'https://www.instagram.com/the.zooniverse/', a11yTitle: 'Instagram' },
    _react2.default.createElement(_SocialInstagram2.default, { colorIndex: 'brand', size: 'small' })
  )],
  talkNavList: [_react2.default.createElement(
    _Anchor2.default,
    { className: 'nav__list-header', href: 'https://www.zooniverse.org/talk' },
    'Talk'
  )]
};

ZooFooter.propTypes = {
  aboutNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  adminContainer: _propTypes2.default.node,
  buildNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  getInvolvedNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  homeLogoDiv: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  mainSectionColorIndex: _propTypes2.default.string,
  newsNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  policyNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  projectNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  smallSectionColorIndex: _propTypes2.default.string,
  socialNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired,
  talkNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired
};

exports.default = ZooFooter;