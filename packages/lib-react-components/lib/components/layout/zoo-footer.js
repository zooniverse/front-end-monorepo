'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledEasterEgg = exports.StyledDivider = exports.StyledNavListItem = exports.StyledNavListHeader = exports.StyledFooterSection = exports.StyledFooterBox = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  border-top: 5px solid #005D69;\n  font-size: 16px;\n\n  &.footer__nav {\n    font-size: 1em;\n  }\n'], ['\n  border-top: 5px solid #005D69;\n  font-size: 16px;\n\n  &.footer__nav {\n    font-size: 1em;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: relative;\n  width: 100%;\n\n  &.small {\n    font-size: 0.8em;\n  }\n'], ['\n  position: relative;\n  width: 100%;\n\n  &.small {\n    font-size: 0.8em;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  color: #007482;\n  font-weight: bold;\n  letter-spacing: 1px;\n  margin-bottom: 0.5em;\n  text-transform: uppercase;\n'], ['\n  color: #007482;\n  font-weight: bold;\n  letter-spacing: 1px;\n  margin-bottom: 0.5em;\n  text-transform: uppercase;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  color: #5C5C5C\n  font-size: 0.8em;\n  font-weight: bold;\n  &:hover, &:focus {\n    color: #252525;\n  }\n\n  &.social-media {\n    svg:hover, svg:focus {\n      fill: #004b54\n    }\n  }\n'], ['\n  color: #5C5C5C\n  font-size: 0.8em;\n  font-weight: bold;\n  &:hover, &:focus {\n    color: #252525;\n  }\n\n  &.social-media {\n    svg:hover, svg:focus {\n      fill: #004b54\n    }\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  border: 0;\n  border-top: 1px solid #979797;\n  display: block;\n  height: 1px;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n'], ['\n  border: 0;\n  border-top: 1px solid #979797;\n  display: block;\n  height: 1px;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  bottom: 0;\n  display: inline-block;\n  height: 74px;\n  margin: 0;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  transition: opacity 0.5s ease;\n  transition-delay: 0.25s;\n  width: 62px;\n  z-index: 1;\n\n  :hover {\n    opacity: 1;\n  }\n'], ['\n  bottom: 0;\n  display: inline-block;\n  height: 74px;\n  margin: 0;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  transition: opacity 0.5s ease;\n  transition-delay: 0.25s;\n  width: 62px;\n  z-index: 1;\n\n  :hover {\n    opacity: 1;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _grommetIcons = require('grommet-icons');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _zooniverseLogotype = require('../zooniverse-logotype');

var _zooniverseLogotype2 = _interopRequireDefault(_zooniverseLogotype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledFooterBox = exports.StyledFooterBox = (0, _styledComponents2.default)(_grommet.Box)(_templateObject);

var StyledFooterSection = exports.StyledFooterSection = (0, _styledComponents2.default)(_grommet.Box)(_templateObject2);

var StyledNavListHeader = exports.StyledNavListHeader = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject3);

var StyledNavListItem = exports.StyledNavListItem = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject4);

var StyledDivider = exports.StyledDivider = _styledComponents2.default.hr(_templateObject5);

var StyledEasterEgg = exports.StyledEasterEgg = (0, _styledComponents2.default)(_grommet.Image)(_templateObject6);

var ZooFooter = function ZooFooter(props) {
  var createKeyedAnchorItem = function createKeyedAnchorItem(navItem, i) {
    return _react2.default.createElement(
      'span',
      { key: 'navItem-' + i },
      navItem
    );
  };

  return _react2.default.createElement(
    StyledFooterBox,
    {
      align: 'center',
      background: props.mainSectionColorIndex,
      direction: 'column',
      pad: { horizontal: 'none', vertical: 'none' },
      tag: 'footer'
    },
    _react2.default.createElement(
      StyledFooterSection,
      {
        direction: 'row',
        fill: 'horizontal',
        justify: 'between',
        pad: { horizontal: 'large', vertical: 'medium' },
        margin: { horizontal: 'large', vertical: 'none' },
        tag: 'section'
      },
      props.homeLogoDiv,
      _react2.default.createElement(
        _grommet.Box,
        {
          className: 'footer__nav',
          direction: 'row',
          gap: 'medium',
          responsive: false
        },
        props.socialNavList.map(function (navItem, i) {
          return createKeyedAnchorItem(navItem, i);
        })
      )
    ),
    _react2.default.createElement(
      _grommet.Box,
      {
        fill: 'horizontal',
        pad: { horizontal: 'large' },
        tag: 'section'
      },
      _react2.default.createElement(StyledDivider, null)
    ),
    _react2.default.createElement(
      StyledFooterSection,
      {
        direction: 'row',
        pad: { horizontal: 'large', vertical: 'medium' },
        margin: {
          top: 'none', bottom: 'large', left: 'none', right: 'none'
        },
        tag: 'section'
      },
      _react2.default.createElement(
        _grommet.Box,
        {
          direction: 'column',
          fill: 'horizontal',
          justify: 'between',
          height: 'small',
          wrap: true
        },
        _react2.default.createElement(
          _grommet.Box,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.projectNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _grommet.Box,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.newsNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _grommet.Box,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.aboutNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _grommet.Box,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.getInvolvedNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _grommet.Box,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.talkNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        ),
        _react2.default.createElement(
          _grommet.Box,
          { className: 'footer__nav', margin: { horizontal: 'none', vertical: 'small' } },
          props.buildNavList.map(function (navItem, i) {
            return createKeyedAnchorItem(navItem, i);
          })
        )
      )
    ),
    _react2.default.createElement(
      StyledFooterSection,
      {
        align: 'center',
        className: 'small',
        background: props.smallSectionColorIndex,
        direction: 'row',
        fill: 'horizontal',
        pad: { horizontal: 'large', vertical: 'none' },
        justify: 'between',
        tag: 'section'
      },
      _react2.default.createElement(
        _grommet.Box,
        {
          className: 'footer__nav',
          direction: 'row',
          gap: 'small',
          responsive: false
        },
        props.policyNavList.map(function (navItem, i) {
          return createKeyedAnchorItem(navItem, i);
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        props.adminContainer,
        _react2.default.createElement(StyledEasterEgg, { src: 'https://s3.amazonaws.com/zooniverse-static/assets/penguin.png', alt: '' })
      )
    )
  );
};

ZooFooter.defaultProps = {
  aboutNavList: [_react2.default.createElement(
    StyledNavListHeader,
    { href: 'https://www.zooniverse.org/about' },
    'About'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/about/publications' },
    'Publications'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/about/team' },
    'Team'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/about/acknowledgements' },
    'Acknowledgements'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/about/contact' },
    'Contact'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/about/faq' },
    'FAQ'
  )],
  adminContainer: null,
  buildNavList: [_react2.default.createElement(
    StyledNavListHeader,
    { href: 'https://www.zooniverse.org/lab' },
    'Build a Project'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/help' },
    'Tutorial'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/help/glossary' },
    'Glossary'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/help/lab-policies' },
    'Policies'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/lab-best-practices/introduction' },
    'Best Practices'
  )],
  getInvolvedNavList: [_react2.default.createElement(
    StyledNavListHeader,
    { href: 'https://www.zooniverse.org/get-involved' },
    'Get Involved'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/get-involved/education' },
    'Education'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/get-involved/call-for-projects' },
    'Call for Projects'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/collections' },
    'Collections'
  )],
  homeLogoDiv: _react2.default.createElement(
    'div',
    { className: 'footer__logo' },
    _react2.default.createElement(
      _grommet.Anchor,
      { href: 'https://www.zooniverse.org' },
      _react2.default.createElement(_zooniverseLogotype2.default, null)
    ),
    _react2.default.createElement('br', null),
    'People Powered Research'
  ),
  mainSectionColorIndex: '#fff',
  newsNavList: [_react2.default.createElement(
    StyledNavListHeader,
    { href: '#' },
    'News'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://daily.zooniverse.org/' },
    'Daily Zooniverse'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://blog.zooniverse.org/projects' },
    'Blog'
  )],
  policyNavList: [_react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/privacy' },
    'Privacy Policy'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'http://jobs.zooniverse.org/' },
    'Jobs'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://status.zooniverse.org/' },
    'System Status'
  ), _react2.default.createElement(
    StyledNavListItem,
    { href: 'https://www.zooniverse.org/security' },
    'Security'
  )],
  projectNavList: [_react2.default.createElement(
    StyledNavListHeader,
    { href: 'https://www.zooniverse.org/projects' },
    'Projects'
  )],
  smallSectionColorIndex: '#eef2f5',
  socialNavList: [_react2.default.createElement(
    StyledNavListItem,
    { className: 'social-media', href: 'https://www.facebook.com/therealzooniverse', a11yTitle: 'Facebook' },
    _react2.default.createElement(_grommetIcons.FacebookOption, { colorIndex: 'brand', size: 'small' }),
    ' '
  ), _react2.default.createElement(
    StyledNavListItem,
    { className: 'social-media', href: 'https://twitter.com/the_zooniverse', a11yTitle: 'Twitter' },
    _react2.default.createElement(_grommetIcons.Twitter, { colorIndex: 'brand', size: 'small' })
  ), _react2.default.createElement(
    StyledNavListItem,
    { className: 'social-media', href: 'https://www.instagram.com/the.zooniverse/', a11yTitle: 'Instagram' },
    _react2.default.createElement(_grommetIcons.Instagram, { colorIndex: 'brand', size: 'small' })
  )],
  talkNavList: [_react2.default.createElement(
    StyledNavListHeader,
    { href: 'https://www.zooniverse.org/talk' },
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