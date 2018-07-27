import React from 'react'
import PropTypes from 'prop-types'

import { Anchor, Box, Image, Grommet } from 'grommet';

import styled, { ThemeProvider } from 'styled-components';
import { whichTealColorForTheme } from './lib';

import counterpart from 'counterpart'
import en from './locales/en';

import zooTheme from '@zooniverse/grommet-theme';
import NavListItem from './components/NavListItem';
import SocialAnchor from './components/SocialAnchor';
import ZooniverseLogotype from '../../zooniverse-logotype';

counterpart.registerTranslations('en', en)

export const StyledFooterSection = styled(Box)`
  position: relative;
`;

export const StyledNavListContainer = styled(Box)`
  min-width: 192px;
`

export const StyledSmallNavListItem = styled(Anchor)`
  color: ${whichTealColorForTheme};
  font-size: 0.8em;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 48px;
  text-transform: uppercase;
`

export const StyledLogoAnchor = styled(Anchor)`
  svg {
    border-bottom: solid thin transparent;
    fill: ${whichTealColorForTheme};
  }
  
  svg:hover, svg:focus {
    border-bottom: solid thin ${whichTealColorForTheme};
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
            <ThemeProvider theme={{ mode: colorTheme }}>
              <StyledLogoAnchor href="https://www.zooniverse.org">
                <ZooniverseLogotype />
              </StyledLogoAnchor>
            </ThemeProvider>
            {props.zooTagline}
          </Box>
          <StyledNavListContainer
            direction="row"
            gap="medium"
            responsive={false}
            tag='nav'
          >
            <SocialAnchor colorTheme={colorTheme} service="facebook" />
            <SocialAnchor colorTheme={colorTheme} service="twitter" />
            <SocialAnchor colorTheme={colorTheme} service="instagram" />
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
            {projectNavListURLs.map((url, i) => {
              return (
                <NavListItem colorTheme={colorTheme} key={url} label={projectNavListLabels[i]} url={url} />
              )
            })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {aboutNavListURLs.map((url, i) => {
              return (
                <NavListItem colorTheme={colorTheme} key={url} label={aboutNavListLabels[i]} url={url} />
              )
            })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {getInvolvedNavListURLs.map((url, i) => {
              return (
                <NavListItem colorTheme={colorTheme} key={url} label={getInvolvedNavListLabels[i]} url={url} />
              )
            })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            
            {talkNavListURLs.map((url, i) => {
              return (
                <NavListItem colorTheme={colorTheme} key={url} label={talkNavListLabels[i]} url={url} />
              )
            })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {buildNavListURLs.map((url, i) => {
              return (
                <NavListItem colorTheme={colorTheme} key={url} label={buildNavListLabels[i]} url={url} />
              )
            })}
          </StyledNavListContainer>
          <StyledNavListContainer flex={true} margin={{ horizontal: 'none', vertical: 'small' }} tag='nav'>
            {newsNavListURLs.map((url, i) => {
              return (
                <NavListItem colorTheme={colorTheme} key={url} label={newsNavListLabels[i]} url={url} />
              )
            })}
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
            {policyNavListURLs.map((url, i) => {
              return (
                <ThemeProvider key={url} theme={{ mode: colorTheme }}>
                  <StyledSmallNavListItem href={url}>
                    {policyNavListLabels[i]}
                  </StyledSmallNavListItem>
                </ThemeProvider>
              )
            })}
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
  talkNavListURLs: [
    'https://www.zooniverse.org/talk'
  ],
  talkNavListLabels: [
    counterpart('ZooFooter.talkLabels.talk'),
  ],
  theme: zooTheme,
  zooTagline: counterpart('ZooFooter.tagLine')
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
  talkNavListURLs: PropTypes.arrayOf(PropTypes.string),
  talkNavListLabels: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.object,
  zooTagline: PropTypes.string
};

export default ZooFooter;
