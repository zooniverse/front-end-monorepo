import { Box, Grid, ResponsiveContext } from 'grommet'
import { arrayOf, node, string } from 'prop-types'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import { useHasMounted } from '../hooks'
import getHost from '../helpers/getHost'
import getHrefWithLocale from '../helpers/getHrefWithLocale'

import {
  InstituteLogos,
  LinkList,
  LogoAndTagline,
  PolicyLinkSection,
  SocialAnchors,
  TwoColumnLinkList
} from './components'

const StyledFooter = styled(Box)`
  // hide the footer when printing, added for the user stats certificate, but applies generally
  @media print {
    display: none;
  }
`

const StyledBox = styled(Box)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent 0%, rgb(166, 167, 169) 50%, transparent 100%);
  }
`

const StyledGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
`

export default function ZooFooter({
  adminContainer = null,
  className = '',
  locale = 'en' // default value mainly relevant for Storybook and test env
}) {
  const hasMounted = useHasMounted()
  const { i18n, t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const host = getHost()

  // This useEffect can be removed when LRC is refactored to use its parent app's i18n instance as source of truth.
  // See app-root as the parent app of lib-content for an example of react-i18next usage.
  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  const aboutNavListURLs = [
    `${host}${getHrefWithLocale(`/about`, locale)}`,
    `${host}${getHrefWithLocale(`/about#contact`, locale)}`,
    `${host}${getHrefWithLocale(`/about/team`, locale)}`,
    `${host}${getHrefWithLocale(`/about/publications`, locale)}`,
    `${host}${getHrefWithLocale(`/about/resources`, locale)}`,
    `${host}${getHrefWithLocale(`/about/faq`, locale)}`
  ]

  const aboutNavListLabels = [
    t('ZooFooter.aboutLabels.about'),
    t('ZooFooter.aboutLabels.contact'),
    t('ZooFooter.aboutLabels.team'),
    t('ZooFooter.aboutLabels.publications'),
    t('ZooFooter.aboutLabels.resources'),
    t('ZooFooter.aboutLabels.faq')
  ]

  const buildNavListURLs = [
    `${host}/lab`,
    'https://help.zooniverse.org/getting-started',
    'https://help.zooniverse.org/glossary',
    'https://help.zooniverse.org/getting-started/lab-policies',
    'https://help.zooniverse.org/best-practices'
  ]

  const buildNavListLabels = [
    t('ZooFooter.buildLabels.buildAProject'),
    t('ZooFooter.buildLabels.tutorial'),
    t('ZooFooter.buildLabels.glossary'),
    t('ZooFooter.buildLabels.policies'),
    t('ZooFooter.buildLabels.bestPractices')
  ]

  const getInvolvedNavListURLs = [
    `${host}${getHrefWithLocale(`/get-involved`, locale)}`,
    `${host}${getHrefWithLocale(`/get-involved/volunteer`, locale)}`,
    `${host}${getHrefWithLocale(`/get-involved/educate`, locale)}`,
    `${host}${getHrefWithLocale(`/get-involved/collaborate`, locale)}`,
    `${host}${getHrefWithLocale(`/get-involved/donate`, locale)}`
  ]

  const getInvolvedNavListLabels = [
    t('ZooFooter.getInvolvedLabels.getInvolved'),
    t('ZooFooter.getInvolvedLabels.volunteer'),
    t('ZooFooter.getInvolvedLabels.educate'),
    t('ZooFooter.getInvolvedLabels.collaborate'),
    t('ZooFooter.getInvolvedLabels.donate')
  ]

  const policyNavListURLs = [
    `${host}/privacy`,
    `https://jobs.zooniverse.org`,
    `https://status.zooniverse.org`,
    `${host}/security`
  ]

  const policyNavListLabels = [
    t('ZooFooter.policyLabels.privacyPolicy'),
    t('ZooFooter.policyLabels.jobs'),
    t('ZooFooter.policyLabels.systemStatus'),
    t('ZooFooter.policyLabels.security')
  ]

  const projectNavListURLs = [
    `${host}${getHrefWithLocale(`/projects`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=arts`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=biology`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=climate`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=history`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=language`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=literature`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=medicine`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=nature`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=physics`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=space`, locale)}`,
    `${host}${getHrefWithLocale(`/projects?discipline=social+science`, locale)}`
  ]

  const projectNavListLabels = [
    t('ZooFooter.projectLabels.projects'),
    t('ZooFooter.projectLabels.arts'),
    t('ZooFooter.projectLabels.biology'),
    t('ZooFooter.projectLabels.climate'),
    t('ZooFooter.projectLabels.history'),
    t('ZooFooter.projectLabels.language'),
    t('ZooFooter.projectLabels.literature'),
    t('ZooFooter.projectLabels.medicine'),
    t('ZooFooter.projectLabels.nature'),
    t('ZooFooter.projectLabels.physics'),
    t('ZooFooter.projectLabels.space'),
    t('ZooFooter.projectLabels.social')
  ]

  const talkNavListURLs = [
    `${host}/talk`,
    `${host}/talk/17`,
    `${host}/talk/2354`,
    `${host}/talk/18`,
    `${host}/talk/1322`
  ]

  const talkNavListLabels = [
    t('ZooFooter.talkLabels.talk'),
    t('ZooFooter.talkLabels.troubleshooting'),
    t('ZooFooter.talkLabels.announcements'),
    t('ZooFooter.talkLabels.projectBuilding'),
    t('ZooFooter.talkLabels.data')
  ]

  return (
    <StyledFooter
      forwardedAs='footer'
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
      responsive
    >
      <Box>
        <StyledBox
          direction='row-responsive'
          justify='between'
          pad={{ vertical: 'small' }}
          margin={{ horizontal: 'medium' }}
          align='center'
        >
          <Box
            direction='row'
            gap={size === 'large' ? '60px' : size === 'medium' ? 'medium' : '15px'}
            justify={size !== 'small' ? '' : 'between'}
            align='center'
          >
            <LogoAndTagline size={size} tagLine={t('ZooFooter.tagLine')} />
            <InstituteLogos size={size} />
          </Box>
          {size !== 'small' ? <SocialAnchors /> : null}
        </StyledBox>

        {size === 'small' ? (
          <Box
            pad={{ horizontal: 'small', top: 'medium' }}
            width='100%'
            align='center'
          >
            <SocialAnchors />
          </Box>
        ) : null}

        <StyledGrid
          forwardedAs='section'
          gap='small'
          pad={{ horizontal: 'medium', top: 'medium', bottom: 'large' }}
        >
          <TwoColumnLinkList
            labels={projectNavListLabels}
            urls={projectNavListURLs}
          />
          <LinkList labels={aboutNavListLabels} urls={aboutNavListURLs} />
          <LinkList
            labels={getInvolvedNavListLabels}
            urls={getInvolvedNavListURLs}
          />
          <LinkList labels={talkNavListLabels} urls={talkNavListURLs} />
          <LinkList labels={buildNavListLabels} urls={buildNavListURLs} />
        </StyledGrid>
      </Box>
      <Box
        background={{
          dark: 'dark-3',
          light: 'light-1'
        }}
        direction='row'
        justify='between'
        pad={{
          horizontal: 'medium',
          vertical: 'small'
        }}
      >
        <PolicyLinkSection
          labels={policyNavListLabels}
          urls={policyNavListURLs}
        />
        <Box>{hasMounted && adminContainer}</Box>
      </Box>
    </StyledFooter>
  )
}

ZooFooter.propTypes = {
  aboutNavListURLs: arrayOf(string),
  adminContainer: node,
  buildNavListURLs: arrayOf(string),
  getInvolvedNavListURLs: arrayOf(string),
  locale: string,
  policyNavListURLs: arrayOf(string),
  projectNavListURLs: arrayOf(string),
  talkNavListURLs: arrayOf(string)
}
