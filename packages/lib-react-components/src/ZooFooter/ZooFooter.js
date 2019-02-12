import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Anchor, Box, Grid, Image } from 'grommet'
import { arrayOf, oneOf, node, string } from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import LinkList from './components/LinkList'
import PolicyLinkSection from './components/PolicyLinkSection'
import LogoAndTagline from './components/LogoAndTagline'
import SocialAnchor from './components/SocialAnchor'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const RelativeDiv = styled.div`
  position: relative;
`

export const StyledEasterEgg = styled(Image)`
  bottom: 100%;
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
`

export default function ZooFooter (props) {
  const {
    aboutNavListLabels,
    aboutNavListURLs,
    adminContainer,
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
    talkNavListLabels,
    talkNavListURLs
  } = props

  return (
    <ThemeProvider theme={{ mode: colorTheme }}>
      <>
        <Box
          align='center'
          background={zooTheme[colorTheme].zooFooter.background}
          border={{
            color: zooTheme.global.colors.brand,
            side: 'top',
            size: 'medium'
          }}
          direction='column'
          pad={{
            bottom: 'xlarge',
            top: 'large'
          }}
          responsive
          tag='footer'
        >
          <Box
            pad={{ horizontal: 'large' }}
            fill='horizontal'
          >

            <Box
              border={{
                color: zooTheme.zooFooter.separator,
                side: 'bottom',
                size: 'xsmall'
              }}
              direction='row-responsive'
              justify='between'
              margin={{ bottom: 'medium' }}
              pad={{ bottom: 'medium' }}
            >
              <LogoAndTagline
                colorTheme={colorTheme}
                tagLine={props.zooTagline}
              />
              <Box
                align='end'
                direction='row'
                gap='small'
                justify='end'
                responsive={false}
                tag='nav'
              >
                <SocialAnchor colorTheme={colorTheme} service='facebook' />
                <SocialAnchor colorTheme={colorTheme} service='twitter' />
                <SocialAnchor colorTheme={colorTheme} service='instagram' />
              </Box>
            </Box>

            <Grid
              fill
              gap='small'
              columns={{
                'count': 'fit',
                'size': 'small'
              }}
              tag='section'
            >
              <LinkList
                colorTheme={colorTheme}
                labels={projectNavListLabels}
                urls={projectNavListURLs}
              />
              <LinkList
                colorTheme={colorTheme}
                labels={aboutNavListLabels}
                urls={aboutNavListURLs}
              />
              <LinkList
                colorTheme={colorTheme}
                labels={getInvolvedNavListLabels}
                urls={getInvolvedNavListURLs}
              />
              <LinkList
                colorTheme={colorTheme}
                labels={talkNavListLabels}
                urls={talkNavListURLs}
              />
              <LinkList
                colorTheme={colorTheme}
                labels={buildNavListLabels}
                urls={buildNavListURLs}
              />
              <LinkList
                colorTheme={colorTheme}
                labels={newsNavListLabels}
                urls={newsNavListURLs}
              />
            </Grid>
          </Box>
        </Box>

        <Box
          align='center'
          background={zooTheme[colorTheme].zooFooter.lowerBackground}
          direction='row'
          fill='horizontal'
          justify='between'
          pad={{
            horizontal: 'large',
            vertical: 'small'
          }}
        >
          <PolicyLinkSection
            labels={policyNavListLabels}
            urls={policyNavListURLs}
          />
          <RelativeDiv>
            {adminContainer}
            <StyledEasterEgg
              src='https://s3.amazonaws.com/zooniverse-static/assets/penguin.png'
              alt=''
            />
          </RelativeDiv>
        </Box>
      </>
    </ThemeProvider>
  )
}

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
    counterpart('ZooFooter.policyLabels.security')
  ],
  projectNavListURLs: [
    'https://www.zooniverse.org/projects'
  ],
  projectNavListLabels: [
    counterpart('ZooFooter.projectLabels.projects')
  ],
  talkNavListURLs: [
    'https://www.zooniverse.org/talk'
  ],
  talkNavListLabels: [
    counterpart('ZooFooter.talkLabels.talk')
  ],
  zooTagline: counterpart('ZooFooter.tagLine')
}

ZooFooter.propTypes = {
  aboutNavListURLs: arrayOf(string),
  aboutNavListLabels: arrayOf(string),
  adminContainer: node,
  buildNavListURLs: arrayOf(string),
  buildNavListLabels: arrayOf(string),
  colorTheme: oneOf(['light', 'dark']),
  getInvolvedNavListURLs: arrayOf(string),
  getInvolvedNavListLabels: arrayOf(string),
  newsNavListURLs: arrayOf(string),
  newsNavListLabels: arrayOf(string),
  policyNavListURLs: arrayOf(string),
  policyNavListLabels: arrayOf(string),
  projectNavListURLs: arrayOf(string),
  projectNavListLabels: arrayOf(string),
  talkNavListURLs: arrayOf(string),
  talkNavListLabels: arrayOf(string),
  zooTagline: string
}
