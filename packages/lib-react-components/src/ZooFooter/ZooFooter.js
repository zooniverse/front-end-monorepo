import counterpart from 'counterpart'
import { Box, Grid, Image } from 'grommet'
import { arrayOf, oneOf, node, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

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
    className,
    getInvolvedNavListLabels,
    getInvolvedNavListURLs,
    newsNavListLabels,
    newsNavListURLs,
    policyNavListLabels,
    policyNavListURLs,
    projectNavListLabels,
    projectNavListURLs,
    talkNavListLabels,
    talkNavListURLs,
    zooTagline
  } = props

  return (
    <Box
      align='center'
      background={{
        dark: 'dark-1',
        light: 'white'
      }}
      border={{
        color: 'brand',
        side: 'top',
        size: 'medium'
      }}
      className={className}
      direction='column'
      pad={{
        top: 'large'
      }}
      responsive
      tag='footer'
    >
      <Box
        pad={{ horizontal: 'large', bottom: 'medium' }}
        fill='horizontal'
      >
        <Box
          border={{
            color: 'light-6',
            side: 'bottom',
            size: 'xsmall'
          }}
          direction='row-responsive'
          justify='between'
          margin={{ bottom: 'medium' }}
          pad={{ bottom: 'medium' }}
        >
          <LogoAndTagline tagLine={zooTagline} />
          <Box
            align='end'
            direction='row'
            gap='small'
            justify='end'
            responsive={false}
            tag='nav'
          >
            <SocialAnchor service='facebook' />
            <SocialAnchor service='twitter' />
            <SocialAnchor service='instagram' />
          </Box>
        </Box>

        <Grid
          fill
          gap='small'
          columns={{
            'count': 'fit',
            'size': '100px'
          }}
          margin={{ bottom: 'large' }}
          tag='section'
        >
          <LinkList
            labels={projectNavListLabels}
            urls={projectNavListURLs}
          />
          <LinkList
            labels={aboutNavListLabels}
            urls={aboutNavListURLs}
          />
          <LinkList
            labels={getInvolvedNavListLabels}
            urls={getInvolvedNavListURLs}
          />
          <LinkList
            labels={talkNavListLabels}
            urls={talkNavListURLs}
          />
          <LinkList
            labels={buildNavListLabels}
            urls={buildNavListURLs}
          />
          <LinkList
            labels={newsNavListLabels}
            urls={newsNavListURLs}
          />
        </Grid>
      </Box>
      <Box
        align='center'
        background={{
          dark: 'dark-3',
          light: 'light-1'
        }}
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
        <Box>
          {adminContainer}
        </Box>
      </Box>
    </Box>
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
