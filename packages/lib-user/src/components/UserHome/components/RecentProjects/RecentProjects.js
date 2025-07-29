import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, number, shape, string } from 'prop-types'
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
  authUser,
  error = undefined,
  isLoading = false,
  renderedProjects = []
}) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  return (
    <ContentBox
      linkLabel={t('common.seeAll')}
      linkProps={{
        href: `/users/${authUser?.login}/stats/projects?sort=recent`
      }}
      title={t('UserHome.RecentProjects.title')}
      titleId='recent-projects'
      screenSize={size}
    >
      {isLoading ? (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      ) : error ? (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>{t('UserHome.RecentProjects.error')}</SpacedText>
        </Box>
      ) : !renderedProjects.length ? (
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
      ) : renderedProjects?.length ? (
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
          {renderedProjects.map(project => (
            <li key={project?.project?.id}>
              <ProjectCard
                description={project?.description}
                displayName={project?.display_name}
                href={`https://www.zooniverse.org/projects/${project?.slug}`}
                imageSrc={project?.avatar_src}
                size={size}
                state={project?.state}
              />
            </li>
          ))}
        </StyledBox>
      ) : null}
    </ContentBox>
  )
}

RecentProjects.propTypes = {
  authUser: shape({
    id: string
  }),
  error: shape({
    message: string,
    status: number
  }),
  isLoading: bool,
  renderedProjects: arrayOf(
    shape({
      id: string
    })
  )
}
