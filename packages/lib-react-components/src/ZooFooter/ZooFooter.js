import { Box, Grid, Image } from 'grommet'
import { arrayOf, node, string } from 'prop-types'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import i18n, { useTranslation } from '../translations/i18n'

import {
  LinkList,
  PolicyLinkSection,
  LogoAndTagline,
  SocialAnchor
} from './components'

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
const defaultProps = {
  aboutNavListURLs: [
    'https://www.zooniverse.org/about',
    'https://www.zooniverse.org/about/publications',
    'https://www.zooniverse.org/about/team',
    'https://www.zooniverse.org/about/acknowledgements',
    'https://www.zooniverse.org/about/contact',
    'https://www.zooniverse.org/about/faq'
  ],
  adminContainer: null,
  buildNavListURLs: [
    'https://www.zooniverse.org/lab',
    'https://www.zooniverse.org/help',
    'https://www.zooniverse.org/help/glossary',
    'https://www.zooniverse.org/help/lab-policies',
    'https://www.zooniverse.org/lab-best-practices/introduction'
  ],
  getInvolvedNavListURLs: [
    'https://www.zooniverse.org/get-involved',
    'https://www.zooniverse.org/get-involved/education',
    'https://www.zooniverse.org/get-involved/call-for-projects',
    'https://www.zooniverse.org/collections'
  ],
  newsNavListURLs: [
    '#',
    'https://daily.zooniverse.org/',
    'https://blog.zooniverse.org/projects'
  ],
  policyNavListURLs: [
    'https://www.zooniverse.org/privacy',
    'http://jobs.zooniverse.org/',
    'https://status.zooniverse.org/',
    'https://www.zooniverse.org/security'
  ],
  projectNavListURLs: [
    'https://www.zooniverse.org/projects'
  ],
  talkNavListURLs: [
    'https://www.zooniverse.org/talk'
  ]
}

export default function ZooFooter ({
  aboutNavListURLs = defaultProps.aboutNavListURLs,
  adminContainer,
  buildNavListURLs = defaultProps.buildNavListURLs,
  className = '',
  getInvolvedNavListURLs = defaultProps.getInvolvedNavListURLs,
  locale,
  newsNavListURLs = defaultProps.newsNavListURLs,
  policyNavListURLs = defaultProps.policyNavListURLs,
  projectNavListURLs = defaultProps.projectNavListURLs,
  talkNavListURLs = defaultProps.talkNavListURLs
}) {
  const { t } = useTranslation()

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  const aboutNavListLabels = [
    t('ZooFooter.aboutLabels.about'),
    t('ZooFooter.aboutLabels.publications'),
    t('ZooFooter.aboutLabels.team'),
    t('ZooFooter.aboutLabels.acknowledgements'),
    t('ZooFooter.aboutLabels.contact'),
    t('ZooFooter.aboutLabels.faq')
  ]

  const buildNavListLabels = [
    t('ZooFooter.buildLabels.buildAProject'),
    t('ZooFooter.buildLabels.tutorial'),
    t('ZooFooter.buildLabels.glossary'),
    t('ZooFooter.buildLabels.policies'),
    t('ZooFooter.buildLabels.bestPractices')
  ]

  const getInvolvedNavListLabels = [
    t('ZooFooter.getInvolvedLabels.getInvolved'),
    t('ZooFooter.getInvolvedLabels.education'),
    t('ZooFooter.getInvolvedLabels.callForProjects'),
    t('ZooFooter.getInvolvedLabels.collections')
  ]

  const newsNavListLabels = [
    t('ZooFooter.newsLabels.news'),
    t('ZooFooter.newsLabels.dailyZooniverse'),
    t('ZooFooter.newsLabels.blog')
  ]

  const policyNavListLabels = [
    t('ZooFooter.policyLabels.privacyPolicy'),
    t('ZooFooter.policyLabels.jobs'),
    t('ZooFooter.policyLabels.systemStatus'),
    t('ZooFooter.policyLabels.security')
  ]

  const projectNavListLabels = [
    t('ZooFooter.projectLabels.projects')
  ]

  const talkNavListLabels = [
    t('ZooFooter.talkLabels.talk')
  ]

  return (
    <Box
      as='footer'
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
          <LogoAndTagline tagLine={t('ZooFooter.tagLine')} />
          <Box
            align='end'
            direction='row'
            gap='small'
            justify='end'
            responsive={false}
          >
            <SocialAnchor service='facebook' />
            <SocialAnchor service='twitter' />
            <SocialAnchor service='instagram' />
          </Box>
        </Box>

        <Grid
          as='section'
          fill
          gap='small'
          columns={{
            'count': 'fit',
            'size': '120px'
          }}
          margin={{ bottom: 'large' }}
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

ZooFooter.propTypes = {
  aboutNavListURLs: arrayOf(string),
  adminContainer: node,
  buildNavListURLs: arrayOf(string),
  getInvolvedNavListURLs: arrayOf(string),
  locale: string,
  newsNavListURLs: arrayOf(string),
  policyNavListURLs: arrayOf(string),
  projectNavListURLs: arrayOf(string),
  talkNavListURLs: arrayOf(string)
}
