import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import { Loader, ProjectCard, SpacedText } from '@zooniverse/react-components'
import { useTranslation, Trans } from '../../../../translations/i18n.js'

import { ContentBox } from '@components/shared'

const StyledBox = styled(Box)`
  list-style: none;
  scroll-snap-type: x mandatory;

  li {
    scroll-snap-align: start;
  }
`

export default function RecentProjects({
  isLoading = false,
  projectPreferences = [],
  error = undefined
}) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  return (
    <ContentBox
      title={t('UserHome.RecentProjects.title')}
      titleId='recent-projects'
      screenSize={size}
    >
      {isLoading && (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      )}
      {!isLoading && error && (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>{t('UserHome.RecentProjects.error')}</SpacedText>
        </Box>
      )}
      {!isLoading && !projectPreferences.length && !error && (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>{t('UserHome.RecentProjects.noProjects')}</SpacedText>
          <Text>
            <Trans
              i18nKey='UserHome.RecentProjects.start'
              components={[
                <Anchor
                  key='projects-page'
                  href='https://www.zooniverse.org/projects'
                />
              ]}
            />
          </Text>
        </Box>
      )}
      {!isLoading &&
        projectPreferences?.length ? (
          <StyledBox
            aria-labelledby='recent-projects'
            forwardedAs='ul'
            direction='row'
            gap='small'
            pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
            overflow={{ horizontal: 'auto' }}
            tabIndex={0}
            margin='0'
          >
            {projectPreferences.map(preference => (
              <li key={preference?.project?.id}>
                <ProjectCard
                  description={preference?.project?.description}
                  displayName={preference?.project?.display_name}
                  href={`https://www.zooniverse.org/projects/${preference?.project?.slug}`}
                  imageSrc={preference?.project?.avatar_src}
                  size={size}
                  state={preference?.project?.state}
                />
              </li>
            ))}
          </StyledBox>
        ) : null}
    </ContentBox>
  )
}

RecentProjects.propTypes = {
  isLoading: bool,
  projectPreferences: arrayOf(
    shape({
      id: string
    })
  )
}
