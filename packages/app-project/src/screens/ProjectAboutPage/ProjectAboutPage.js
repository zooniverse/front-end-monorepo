import { Box, Grid, Heading } from 'grommet'
import { arrayOf, bool, object, shape, string } from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { useTranslation } from 'next-i18next'

/** Components */
import StandardLayout from '@shared/components/StandardLayout'
import {
  SpacedHeading,
  SpacedText,
  withResponsiveContext
} from '@zooniverse/react-components'
import AboutSidebar from './components/AboutSidebar'
import AboutDropdownNav from './components/AboutDropdownNav'
import TeamMember from './components/TeamMember'
import AboutMarkdownz from './components/AboutMarkdownz/AboutMarkdownz'
import ThemeModeToggle from '@components/ThemeModeToggle'

const PageHeading = styled(Heading)`
  font-weight: normal;
`

const SidebarHeading = styled(SpacedHeading)`
  padding: 5px 20px;
`

function ProjectAboutPage ({
  aboutNavLinks,
  aboutPageData = {},
  inBeta = false,
  projectDisplayName,
  screenSize,
  teamArray = [],
  theme: { dark = false }
}) {
  const { t } = useTranslation('screens')

  const defaultContent = {
    title: aboutPageData.title,
    content: aboutPageData.content
  }
  const { strings, title: pageType } = aboutPageData
  const { content } = strings ?? defaultContent

  const pageTitle = t(`About.PageHeading.title.${pageType.toLowerCase()}`)
  const isTeamPage = pageType.toLowerCase().includes('team')
  // note that for future additional locales, CSS property :lang is available to format strings

  return (
    <StandardLayout inBeta={inBeta}>
      <Grid columns={screenSize === 'small' ? ['auto'] : ['xsmall', 'flex', 'xsmall']}>
        <Box />
        <Box
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          border={{
            light: {
              color: 'light-3',
              size: '1px',
              style: 'solid',
              side: 'vertical'
            },
            dark: 'none'
          }}
          height={{ min: '98vh' }}
          width={{ min: 'fill-available', max: 'xxlarge' }}
          pad='large'
          alignSelf='center'
          elevation={dark ? 'xlarge' : 'none'}
          flex
        >
          <Grid
            columns={screenSize === 'small' ? ['auto'] : ['small', 'flex']}
            gap={screenSize === 'small' ? '' : '8%'}
          >
            {screenSize !== 'small' ? (
              <Box as='aside'>
                <SidebarHeading children={t('About.SidebarHeading')} />
                <AboutSidebar aboutNavLinks={aboutNavLinks} />
              </Box>
            ) : (
              <AboutDropdownNav aboutNavLinks={aboutNavLinks} />
            )}
            <Box as='main'>
              <PageHeading
                children={pageTitle}
                level='2'
                weight='normal'
                size='40px'
                margin={{ bottom: '30px' }}
              />
              {isTeamPage ? (
                <Grid
                  columns={screenSize === 'small' ? ['auto'] : ['flex', 'small']}
                  gap={screenSize === 'small' ? '' : '8%'}
                >
                  <AboutMarkdownz content={content} />
                  <Box>
                    <Heading
                      id='team-sidebar-heading'
                      level={3}
                      margin={{ top: '0', bottom: '14px' }}
                      pad='none'
                      size='small'
                    >
                      <SpacedText
                        children={`${projectDisplayName} TEAM`}
                        weight='bold'
                        color={{ light: 'black', dark: '' }}
                      />
                    </Heading>
                    {teamArray.length && (
                      <Box aria-labelledby='team-sidebar-heading' as='ul' margin='none' pad='none'>
                        {teamArray.map(user => (
                          <TeamMember key={user.id} user={user} />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Grid>
              ) : (
                <AboutMarkdownz content={content} />
              )}
            </Box>
          </Grid>
        </Box>
        <Box justify='start' margin={screenSize === 'small' ? { vertical: 'medium' } : { top: 'medium' }}>
          <ThemeModeToggle />
        </Box>
      </Grid>
    </StandardLayout>
  )
}

ProjectAboutPage.propTypes = {
  aboutPageData: object,
  inBeta: bool,
  teamArray: arrayOf(
    shape({
      avatar_src: string,
      display_name: string,
      id: string.isRequired,
      login: string,
      role: string
    })
  )
}

export { ProjectAboutPage }
export default withTheme(withResponsiveContext(ProjectAboutPage))
