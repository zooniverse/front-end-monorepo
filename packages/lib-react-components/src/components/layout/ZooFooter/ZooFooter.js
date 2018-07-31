import React from 'react'
import PropTypes from 'prop-types'

import { Anchor, Box, Image, Grommet } from 'grommet';
import { FacebookOption, Twitter, Instagram } from 'grommet-icons';

import styled from 'styled-components';
import { ThemeProvider } from 'styled-theming';

import counterpart from 'counterpart'
import en from './locales/en';

import zooTheme from '@zooniverse/grommet-theme';
import ZooniverseLogotype from '../../zooniverse-logotype';

counterpart.registerTranslations('en', en)

function whichTealColorForTheme(colorTheme) {
  return (colorTheme === 'light') ? zooTheme.global.colors.brand : zooTheme.global.colors.lightTeal
}

export const StyledFooterSection = styled(Box)`
  position: relative;

  &.small {

  }
`;

export const StyledNavListContainer = styled(Box)`
  min-width: 192px;
`

export const StyledNavListHeader = styled(Anchor)`

`;

export const StyledNavListItem = styled(Anchor)`
  &:first-child {
    color: ${props => whichTealColorForTheme(props.colorTheme)}
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 0.5em;
    text-transform: uppercase;
  }

  color: ${props => (props.colorTheme === 'light') ? '#5C5C5C' : 'inherit' };
  font-size: 0.8em;
  font-weight: bold;
`;

export const StyledSmallNavListItem = styled(Anchor)`
  color: ${props => whichTealColorForTheme(props.colorTheme)};
  font-size: 0.8em;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 48px;
  text-transform: uppercase;
`

export const StyledSocialAnchor = styled(Anchor)`
  padding: 0;
  svg {
    border-bottom: solid thin transparent;
    fill: ${props => whichTealColorForTheme(props.colorTheme)};
  }

  svg:hover, svg:focus {
    border-bottom: solid thin ${props => whichTealColorForTheme(props.colorTheme)};
  }
`

export const StyledLogoAnchor = styled(Anchor)`
  svg {
    border-bottom: solid thin transparent;
    fill: ${props => whichTealColorForTheme(props.colorTheme)};
  }

  g {
    fill: ${props => whichTealColorForTheme(props.colorTheme)};
  }
  
  svg:hover, svg:focus {
    border-bottom: solid thin ${props => whichTealColorForTheme(props.colorTheme)};
  }
`

export const StyledDivider = styled.hr`
  border: 0;
  border-top: 1px solid #979797;
  display: block;
  height: 1px;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const StyledEasterEgg = styled(Image)`
  bottom: 0;
  display: inline-block;
  height: 74px;
  margin: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  transition: opacity 0.5s ease;
  transition-delay: 0.25s;
  width: 62px;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;

const ZooFooter = (props) => {
  const {
    aboutNavListLabels,
    aboutNavListURLs,
    buildNavListLabels,
    buildNavListURLs,
    colorTheme,
    getInvolvedNavListLabels,
    getInvolvedNavListURLs,
    newsNavListLabels,
    newsNavListURLs,
    policyNavListLabels,
    policyNavListURLs,
    projectNavListLabels,
    projectNavListURLs,
    socialNavListURLs,
    talkNavListLabels,
    talkNavListURLs,
    theme
  } = props

  return (
    <Grommet theme={theme}>
      <Box
        align="center"
        background={(colorTheme === 'light') ? '#fff' : zooTheme.dark.colors.background.default}
        border={{
          color: zooTheme.global.colors.brand,
          side: 'top',
          size: 'medium'
        }}
        direction="column"
        pad={{ horizontal: 'none', vertical: 'none' }}
        responsive={true}
        tag="footer"
      >
        <StyledFooterSection
          direction="row"
          fill="horizontal"
          justify="between"
          pad={{ horizontal: 'large', vertical: 'medium' }}
          margin={{ horizontal: 'large', vertical: 'none' }}
          tag="section"
          wrap={true}
        >
          <Box>
            <StyledLogoAnchor colorTheme={colorTheme} href="https://www.zooniverse.org">
              <ZooniverseLogotype />
            </StyledLogoAnchor>
            {props.zooTagline}
          </Box>
          <StyledNavListContainer
            direction="row"
            gap="medium"
            responsive={false}
            tag='nav'
          >
            <StyledSocialAnchor
              colorTheme={colorTheme}
              href={socialNavListURLs.facebook}
              a11yTitle="Facebook"
              icon={<FacebookOption size="small" />}
            />
            <StyledSocialAnchor
              colorTheme={colorTheme}
              href={socialNavListURLs.twitter}
              a11yTitle="Twitter"
              icon={<Twitter size="small" />}
            />
            <StyledSocialAnchor
              colorTheme={colorTheme}
              href={socialNavListURLs.instagram}
              a11yTitle="Instagram"
              icon={<Instagram size="small" />}
            />
          </StyledNavListContainer>
        </StyledFooterSection>
        <Box
          fill="horizontal"
          pad={{ horizontal: 'large' }}
          tag="section"
        >
          <StyledDivider />
        </Box>
        <StyledFooterSection
          direction="row"
          fill="horizontal"
          justify="start"
          pad={{ horizontal: 'large', vertical: 'medium' }}
          margin={{
            top: 'none', bottom: 'large', left: 'none', right: 'none'
          }}
          tag="section"
          responsive={true}
          wrap={true}
        >
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {projectNavListURLs.map((url, i) => { return <StyledNavListItem key={url} href={url} colorTheme={colorTheme}>{projectNavListLabels[i]}</StyledNavListItem> })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {aboutNavListURLs.map((url, i) => { return <StyledNavListItem key={url} href={url} colorTheme={colorTheme}>{aboutNavListLabels[i]}</StyledNavListItem> })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {getInvolvedNavListURLs.map((url, i) => { return <StyledNavListItem key={url} href={url} colorTheme={colorTheme}>{getInvolvedNavListLabels[i]}</StyledNavListItem> })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {talkNavListURLs.map((url, i) => { return <StyledNavListItem key={url} href={url} colorTheme={colorTheme}>{talkNavListLabels[i]}</StyledNavListItem> })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {buildNavListURLs.map((url, i) => { return <StyledNavListItem key={url} href={url} colorTheme={colorTheme}>{buildNavListLabels[i]}</StyledNavListItem> })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {newsNavListURLs.map((url, i) => { return <StyledNavListItem key={url} href={url} colorTheme={colorTheme}>{newsNavListLabels[i]}</StyledNavListItem> })}
          </StyledNavListContainer>
        </StyledFooterSection>
        <StyledFooterSection
          align="center"
          className="small"
          background={(colorTheme === 'light') ?
            zooTheme.light.colors.background.default :
            zooTheme.dark.colors.background.container
          }
          direction="row"
          fill="horizontal"
          pad={{ horizontal: 'large', vertical: 'none' }}
          justify="between"
          tag="section"
        >
          <StyledNavListContainer
            direction="row"
            gap="small"
            responsive={false}
            tag='nav'
          >
            {policyNavListURLs.map((url, i) => { return <StyledSmallNavListItem key={url} href={url} colorTheme={colorTheme}>{policyNavListLabels[i]}</StyledSmallNavListItem> })}
          </StyledNavListContainer>
          <div>
            {props.adminContainer}
            <StyledEasterEgg src="https://s3.amazonaws.com/zooniverse-static/assets/penguin.png" alt="" />
          </div>
        </StyledFooterSection>
      </Box>
    </Grommet>
  );
};

ZooFooter.defaultProps = {
  aboutNavListURLs: [
    'https://www.zooniverse.org/about',
    'https://www.zooniverse.org/about/publications',
    'https://www.zooniverse.org/about/team',
    'https://www.zooniverse.org/about/acknowledgements',
    'https://www.zooniverse.org/about/contact',
    'https://www.zooniverse.org/about/faq'
  ],
  aboutNavListLabels: [
    counterpart('ZooFooter.aboutLabels.about'),
    counterpart('ZooFooter.aboutLabels.publications'),
    counterpart('ZooFooter.aboutLabels.team'),
    counterpart('ZooFooter.aboutLabels.acknowledgements'),
    counterpart('ZooFooter.aboutLabels.contact'),
    counterpart('ZooFooter.aboutLabels.faq')
  ],
  adminContainer: null,
  buildNavListURLs: [
    'https://www.zooniverse.org/lab',
    'https://www.zooniverse.org/help',
    'https://www.zooniverse.org/help/glossary',
    'https://www.zooniverse.org/help/lab-policies',
    'https://www.zooniverse.org/lab-best-practices/introduction'
  ],
  buildNavListLabels: [
    counterpart('ZooFooter.buildLabels.buildAProject'),
    counterpart('ZooFooter.buildLabels.tutorial'),
    counterpart('ZooFooter.buildLabels.glossary'),
    counterpart('ZooFooter.buildLabels.policies'),
    counterpart('ZooFooter.buildLabels.bestPractices')
  ],
  colorTheme: 'light',
  getInvolvedNavListURLs: [
    'https://www.zooniverse.org/get-involved',
    'https://www.zooniverse.org/get-involved/education',
    'https://www.zooniverse.org/get-involved/call-for-projects',
    'https://www.zooniverse.org/collections'
  ],
  getInvolvedNavListLabels: [
    counterpart('ZooFooter.getInvolvedLabels.getInvolved'),
    counterpart('ZooFooter.getInvolvedLabels.education'),
    counterpart('ZooFooter.getInvolvedLabels.callForProjects'),
    counterpart('ZooFooter.getInvolvedLabels.collections')
  ],
  newsNavListURLs: [
    '#',
    'https://daily.zooniverse.org/',
    'https://blog.zooniverse.org/projects'
  ],
  newsNavListLabels: [
    counterpart('ZooFooter.newsLabels.news'),
    counterpart('ZooFooter.newsLabels.dailyZooniverse'),
    counterpart('ZooFooter.newsLabels.blog')
  ],
  policyNavListURLs: [
    'https://www.zooniverse.org/privacy',
    'http://jobs.zooniverse.org/',
    'https://status.zooniverse.org/',
    'https://www.zooniverse.org/security'
  ],
  policyNavListLabels: [
    counterpart('ZooFooter.policyLabels.privacyPolicy'),
    counterpart('ZooFooter.policyLabels.jobs'),
    counterpart('ZooFooter.policyLabels.systemStatus'),
    counterpart('ZooFooter.policyLabels.security'),
  ],
  projectNavListURLs: [
    'https://www.zooniverse.org/projects',
  ],
  projectNavListLabels: [
    counterpart('ZooFooter.projectLabels.projects'),
  ],
  socialNavListURLs: {
    facebook: 'https://www.facebook.com/therealzooniverse',
    twitter: 'https://twitter.com/the_zooniverse',
    instagram:'https://www.instagram.com/the.zooniverse/'
  },
  talkNavListURLs: [
    'https://www.zooniverse.org/talk'
  ],
  talkNavListLabels: [
    counterpart('ZooFooter.talkLabels.talk'),
  ],
  theme: zooTheme,
  zooTagline: 'People-Powered Research'
};

ZooFooter.propTypes = {
  aboutNavListURLs: PropTypes.arrayOf(PropTypes.string),
  aboutNavListLabels: PropTypes.arrayOf(PropTypes.string),
  adminContainer: PropTypes.node,
  buildNavListURLs: PropTypes.arrayOf(PropTypes.string),
  buildNavListLabels: PropTypes.arrayOf(PropTypes.string),
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  getInvolvedNavListURLs: PropTypes.arrayOf(PropTypes.string),
  getInvolvedNavListLabels: PropTypes.arrayOf(PropTypes.string),
  newsNavListURLs: PropTypes.arrayOf(PropTypes.string),
  newsNavListLabels: PropTypes.arrayOf(PropTypes.string),
  policyNavListURLs: PropTypes.arrayOf(PropTypes.string),
  policyNavListLabels: PropTypes.arrayOf(PropTypes.string),
  projectNavListURLs: PropTypes.arrayOf(PropTypes.string),
  projectNavListLabels: PropTypes.arrayOf(PropTypes.string),
  socialNavListURLs: PropTypes.objectOf(PropTypes.string),
  talkNavListURLs: PropTypes.arrayOf(PropTypes.string),
  talkNavListLabels: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.object,
  zooTagline: PropTypes.string
};

export default ZooFooter;
