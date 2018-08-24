'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledEasterEgg = exports.StyledDivider = exports.StyledLogoAnchor = exports.StyledSmallNavListItem = exports.StyledNavListContainer = exports.StyledFooterSection = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n'], ['\n  position: relative;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  min-width: 192px;\n'], ['\n  min-width: 192px;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  font-size: 0.8em;\n  font-weight: bold;\n  letter-spacing: 1px;\n  line-height: 48px;\n  text-transform: uppercase;\n'], ['\n  font-size: 0.8em;\n  font-weight: bold;\n  letter-spacing: 1px;\n  line-height: 48px;\n  text-transform: uppercase;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  svg {\n    border-bottom: solid thin transparent;\n  }\n  \n  svg:hover, svg:focus {\n    border-bottom: solid thin ', ';\n  }\n'], ['\n  svg {\n    border-bottom: solid thin transparent;\n  }\n  \n  svg:hover, svg:focus {\n    border-bottom: solid thin ', ';\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  border: 0;\n  border-top: 1px solid #979797;\n  display: block;\n  height: 1px;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n'], ['\n  border: 0;\n  border-top: 1px solid #979797;\n  display: block;\n  height: 1px;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  bottom: 0;\n  display: inline-block;\n  height: 74px;\n  margin: 0;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  transition: opacity 0.5s ease;\n  transition-delay: 0.25s;\n  width: 62px;\n  z-index: 1;\n\n  &:hover {\n    opacity: 1;\n  }\n'], ['\n  bottom: 0;\n  display: inline-block;\n  height: 74px;\n  margin: 0;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  transition: opacity 0.5s ease;\n  transition-delay: 0.25s;\n  width: 62px;\n  z-index: 1;\n\n  &:hover {\n    opacity: 1;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _lib = require('./lib');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _en = require('./locales/en');

var _en2 = _interopRequireDefault(_en);

var _grommetTheme = require('@zooniverse/grommet-theme');

var _grommetTheme2 = _interopRequireDefault(_grommetTheme);

var _NavListItem = require('./components/NavListItem');

var _NavListItem2 = _interopRequireDefault(_NavListItem);

var _SocialAnchor = require('./components/SocialAnchor');

var _SocialAnchor2 = _interopRequireDefault(_SocialAnchor);

var _zooniverseLogotype = require('../../zooniverse-logotype');

var _zooniverseLogotype2 = _interopRequireDefault(_zooniverseLogotype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

_counterpart2.default.registerTranslations('en', _en2.default);

var StyledFooterSection = exports.StyledFooterSection = (0, _styledComponents2.default)(_grommet.Box)(_templateObject);

var StyledNavListContainer = exports.StyledNavListContainer = (0, _styledComponents2.default)(_grommet.Box)(_templateObject2);

var StyledSmallNavListItem = exports.StyledSmallNavListItem = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject3);

var StyledLogoAnchor = exports.StyledLogoAnchor = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject4, _lib.whichTealColorForTheme);

var StyledDivider = exports.StyledDivider = _styledComponents2.default.hr(_templateObject5);

var StyledEasterEgg = exports.StyledEasterEgg = (0, _styledComponents2.default)(_grommet.Image)(_templateObject6);

var ZooFooter = function ZooFooter(props) {
  var aboutNavListLabels = props.aboutNavListLabels,
      aboutNavListURLs = props.aboutNavListURLs,
      buildNavListLabels = props.buildNavListLabels,
      buildNavListURLs = props.buildNavListURLs,
      colorTheme = props.colorTheme,
      getInvolvedNavListLabels = props.getInvolvedNavListLabels,
      getInvolvedNavListURLs = props.getInvolvedNavListURLs,
      newsNavListLabels = props.newsNavListLabels,
      newsNavListURLs = props.newsNavListURLs,
      policyNavListLabels = props.policyNavListLabels,
      policyNavListURLs = props.policyNavListURLs,
      projectNavListLabels = props.projectNavListLabels,
      projectNavListURLs = props.projectNavListURLs,
      talkNavListLabels = props.talkNavListLabels,
      talkNavListURLs = props.talkNavListURLs,
      theme = props.theme;


  return _react2.default.createElement(
    _grommet.Grommet,
    { theme: theme },
    _react2.default.createElement(
      _grommet.Box,
      {
        align: 'center',
        background: colorTheme === 'light' ? '#fff' : _grommetTheme2.default.dark.colors.background.default,
        border: {
          color: _grommetTheme2.default.global.colors.brand,
          side: 'top',
          size: 'medium'
        },
        direction: 'column',
        pad: { horizontal: 'none', vertical: 'none' },
        responsive: true,
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
          tag: 'section',
          wrap: true
        },
        _react2.default.createElement(
          _grommet.Box,
          null,
          _react2.default.createElement(
            _styledComponents.ThemeProvider,
            { theme: { mode: colorTheme } },
            _react2.default.createElement(
              StyledLogoAnchor,
              { href: 'https://www.zooniverse.org' },
              _react2.default.createElement(_zooniverseLogotype2.default, null)
            )
          ),
          props.zooTagline
        ),
        _react2.default.createElement(
          StyledNavListContainer,
          {
            direction: 'row',
            gap: 'medium',
            responsive: false,
            tag: 'nav'
          },
          _react2.default.createElement(_SocialAnchor2.default, { colorTheme: colorTheme, service: 'facebook' }),
          _react2.default.createElement(_SocialAnchor2.default, { colorTheme: colorTheme, service: 'twitter' }),
          _react2.default.createElement(_SocialAnchor2.default, { colorTheme: colorTheme, service: 'instagram' })
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
          fill: 'horizontal',
          justify: 'start',
          pad: { horizontal: 'large', vertical: 'medium' },
          margin: {
            top: 'none', bottom: 'large', left: 'none', right: 'none'
          },
          tag: 'section',
          responsive: true,
          wrap: true
        },
        _react2.default.createElement(
          StyledNavListContainer,
          { flex: true, margin: { horizontal: 'none', vertical: 'small' }, tag: 'nav' },
          projectNavListURLs.map(function (url, i) {
            return _react2.default.createElement(_NavListItem2.default, { colorTheme: colorTheme, key: url, label: projectNavListLabels[i], url: url });
          })
        ),
        _react2.default.createElement(
          StyledNavListContainer,
          { flex: true, margin: { horizontal: 'none', vertical: 'small' }, tag: 'nav' },
          aboutNavListURLs.map(function (url, i) {
            return _react2.default.createElement(_NavListItem2.default, { colorTheme: colorTheme, key: url, label: aboutNavListLabels[i], url: url });
          })
        ),
        _react2.default.createElement(
          StyledNavListContainer,
          { flex: true, margin: { horizontal: 'none', vertical: 'small' }, tag: 'nav' },
          getInvolvedNavListURLs.map(function (url, i) {
            return _react2.default.createElement(_NavListItem2.default, { colorTheme: colorTheme, key: url, label: getInvolvedNavListLabels[i], url: url });
          })
        ),
        _react2.default.createElement(
          StyledNavListContainer,
          { flex: true, margin: { horizontal: 'none', vertical: 'small' }, tag: 'nav' },
          talkNavListURLs.map(function (url, i) {
            return _react2.default.createElement(_NavListItem2.default, { colorTheme: colorTheme, key: url, label: talkNavListLabels[i], url: url });
          })
        ),
        _react2.default.createElement(
          StyledNavListContainer,
          { flex: true, margin: { horizontal: 'none', vertical: 'small' }, tag: 'nav' },
          buildNavListURLs.map(function (url, i) {
            return _react2.default.createElement(_NavListItem2.default, { colorTheme: colorTheme, key: url, label: buildNavListLabels[i], url: url });
          })
        ),
        _react2.default.createElement(
          StyledNavListContainer,
          { flex: true, margin: { horizontal: 'none', vertical: 'small' }, tag: 'nav' },
          newsNavListURLs.map(function (url, i) {
            return _react2.default.createElement(_NavListItem2.default, { colorTheme: colorTheme, key: url, label: newsNavListLabels[i], url: url });
          })
        )
      ),
      _react2.default.createElement(
        StyledFooterSection,
        {
          align: 'center',
          className: 'small',
          background: colorTheme === 'light' ? _grommetTheme2.default.light.colors.background.default : _grommetTheme2.default.dark.colors.background.container,
          direction: 'row',
          fill: 'horizontal',
          pad: { horizontal: 'large', vertical: 'none' },
          justify: 'between',
          tag: 'section'
        },
        _react2.default.createElement(
          StyledNavListContainer,
          {
            direction: 'row',
            gap: 'small',
            responsive: false,
            tag: 'nav'
          },
          policyNavListURLs.map(function (url, i) {
            return _react2.default.createElement(
              _styledComponents.ThemeProvider,
              { key: url, theme: { mode: colorTheme } },
              _react2.default.createElement(
                StyledSmallNavListItem,
                { href: url },
                policyNavListLabels[i]
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          props.adminContainer,
          _react2.default.createElement(StyledEasterEgg, { src: 'https://s3.amazonaws.com/zooniverse-static/assets/penguin.png', alt: '' })
        )
      )
    )
  );
};

ZooFooter.defaultProps = {
  aboutNavListURLs: ['https://www.zooniverse.org/about', 'https://www.zooniverse.org/about/publications', 'https://www.zooniverse.org/about/team', 'https://www.zooniverse.org/about/acknowledgements', 'https://www.zooniverse.org/about/contact', 'https://www.zooniverse.org/about/faq'],
  aboutNavListLabels: [(0, _counterpart2.default)('ZooFooter.aboutLabels.about'), (0, _counterpart2.default)('ZooFooter.aboutLabels.publications'), (0, _counterpart2.default)('ZooFooter.aboutLabels.team'), (0, _counterpart2.default)('ZooFooter.aboutLabels.acknowledgements'), (0, _counterpart2.default)('ZooFooter.aboutLabels.contact'), (0, _counterpart2.default)('ZooFooter.aboutLabels.faq')],
  adminContainer: null,
  buildNavListURLs: ['https://www.zooniverse.org/lab', 'https://www.zooniverse.org/help', 'https://www.zooniverse.org/help/glossary', 'https://www.zooniverse.org/help/lab-policies', 'https://www.zooniverse.org/lab-best-practices/introduction'],
  buildNavListLabels: [(0, _counterpart2.default)('ZooFooter.buildLabels.buildAProject'), (0, _counterpart2.default)('ZooFooter.buildLabels.tutorial'), (0, _counterpart2.default)('ZooFooter.buildLabels.glossary'), (0, _counterpart2.default)('ZooFooter.buildLabels.policies'), (0, _counterpart2.default)('ZooFooter.buildLabels.bestPractices')],
  colorTheme: 'light',
  getInvolvedNavListURLs: ['https://www.zooniverse.org/get-involved', 'https://www.zooniverse.org/get-involved/education', 'https://www.zooniverse.org/get-involved/call-for-projects', 'https://www.zooniverse.org/collections'],
  getInvolvedNavListLabels: [(0, _counterpart2.default)('ZooFooter.getInvolvedLabels.getInvolved'), (0, _counterpart2.default)('ZooFooter.getInvolvedLabels.education'), (0, _counterpart2.default)('ZooFooter.getInvolvedLabels.callForProjects'), (0, _counterpart2.default)('ZooFooter.getInvolvedLabels.collections')],
  newsNavListURLs: ['#', 'https://daily.zooniverse.org/', 'https://blog.zooniverse.org/projects'],
  newsNavListLabels: [(0, _counterpart2.default)('ZooFooter.newsLabels.news'), (0, _counterpart2.default)('ZooFooter.newsLabels.dailyZooniverse'), (0, _counterpart2.default)('ZooFooter.newsLabels.blog')],
  policyNavListURLs: ['https://www.zooniverse.org/privacy', 'http://jobs.zooniverse.org/', 'https://status.zooniverse.org/', 'https://www.zooniverse.org/security'],
  policyNavListLabels: [(0, _counterpart2.default)('ZooFooter.policyLabels.privacyPolicy'), (0, _counterpart2.default)('ZooFooter.policyLabels.jobs'), (0, _counterpart2.default)('ZooFooter.policyLabels.systemStatus'), (0, _counterpart2.default)('ZooFooter.policyLabels.security')],
  projectNavListURLs: ['https://www.zooniverse.org/projects'],
  projectNavListLabels: [(0, _counterpart2.default)('ZooFooter.projectLabels.projects')],
  talkNavListURLs: ['https://www.zooniverse.org/talk'],
  talkNavListLabels: [(0, _counterpart2.default)('ZooFooter.talkLabels.talk')],
  theme: _grommetTheme2.default,
  zooTagline: (0, _counterpart2.default)('ZooFooter.tagLine')
};

ZooFooter.propTypes = {
  aboutNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  aboutNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  adminContainer: _propTypes2.default.node,
  buildNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  buildNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  colorTheme: _propTypes2.default.oneOf(['light', 'dark']),
  getInvolvedNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  getInvolvedNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  newsNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  newsNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  policyNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  policyNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  projectNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  projectNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  talkNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  talkNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  theme: _propTypes2.default.object,
  zooTagline: _propTypes2.default.string
};

exports.default = ZooFooter;
//# sourceMappingURL=ZooFooter.js.map