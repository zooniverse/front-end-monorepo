import { Box, Grid, ResponsiveContext } from 'grommet'
import { arrayOf, node, string } from 'prop-types'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import i18n, { useTranslation } from '../translations/i18n'
import { useHasMounted } from '../hooks'

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

const defaultProps = {
  aboutNavListURLs: [
    'https://www.zooniverse.org/about',
    'https://www.zooniverse.org/about#contact',
    'https://www.zooniverse.org/about/team',
    'https://www.zooniverse.org/about/publications',
    'https://www.zooniverse.org/about/resources',
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
    'https://www.zooniverse.org/get-involved/volunteer',
    'https://www.zooniverse.org/get-involved/educate',
    'https://www.zooniverse.org/get-involved/collaborate',
    'https://www.zooniverse.org/get-involved/donate'
  ],
  policyNavListURLs: [
    'https://www.zooniverse.org/privacy',
    'http://jobs.zooniverse.org/',
    'https://status.zooniverse.org/',
    'https://www.zooniverse.org/security'
  ],
  projectNavListURLs: [
    'https://www.zooniverse.org/projects',
    'https://www.zooniverse.org/projects?discipline=arts',
    'https://www.zooniverse.org/projects?discipline=biology',
    'https://www.zooniverse.org/projects?discipline=climate',
    'https://www.zooniverse.org/projects?discipline=history',
    'https://www.zooniverse.org/projects?discipline=language',
    'https://www.zooniverse.org/projects?discipline=literature',
    'https://www.zooniverse.org/projects?discipline=medicine',
    'https://www.zooniverse.org/projects?discipline=nature',
    'https://www.zooniverse.org/projects?discipline=physics',
    'https://www.zooniverse.org/projects?discipline=space',
    'https://www.zooniverse.org/projects?discipline=social+science'
  ],
  talkNavListURLs: [
    'https://www.zooniverse.org/talk',
    'https://www.zooniverse.org/talk/17',
    'https://www.zooniverse.org/talk/2354',
    'https://www.zooniverse.org/talk/18',
    'https://www.zooniverse.org/talk/1322'
  ]
}

export default function ZooFooter({
  aboutNavListURLs = defaultProps.aboutNavListURLs,
  adminContainer,
  buildNavListURLs = defaultProps.buildNavListURLs,
  className = '',
  getInvolvedNavListURLs = defaultProps.getInvolvedNavListURLs,
  locale,
  policyNavListURLs = defaultProps.policyNavListURLs,
  projectNavListURLs = defaultProps.projectNavListURLs,
  talkNavListURLs = defaultProps.talkNavListURLs
}) {
  const hasMounted = useHasMounted()
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  const aboutNavListLabels = [
    t('ZooFooter.aboutLabels.about'),
    t('ZooFooter.aboutLabels.contact'),
    t('ZooFooter.aboutLabels.team'),
    t('ZooFooter.aboutLabels.publications'),
    t('ZooFooter.aboutLabels.resources'),
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
    t('ZooFooter.getInvolvedLabels.volunteer'),
    t('ZooFooter.getInvolvedLabels.educate'),
    t('ZooFooter.getInvolvedLabels.collaborate'),
    t('ZooFooter.getInvolvedLabels.donate')
  ]

  const policyNavListLabels = [
    t('ZooFooter.policyLabels.privacyPolicy'),
    t('ZooFooter.policyLabels.jobs'),
    t('ZooFooter.policyLabels.systemStatus'),
    t('ZooFooter.policyLabels.security')
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
