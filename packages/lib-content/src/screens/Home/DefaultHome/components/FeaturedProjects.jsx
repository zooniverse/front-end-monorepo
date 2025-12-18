import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import useSWR from 'swr'
import { projects } from '@zooniverse/panoptes-js'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'
import HorizontalRuleLogo from '@components/HorizontalRuleLogo/HorizontalRuleLogo'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

const getFeaturedProjects = async () => {
  try {
    const response = await projects.get({
      query: {
        featured: true,
        launch_approved: true,
        cards: true
      }
    })
    if (response.ok) {
      return response.body.projects
    }
    return []
  } catch (error) {
    console.log(error)
    return []
  }
}

function useFeaturedProjects() {
  return useSWR('featured-projects', getFeaturedProjects, SWROptions)
}

export default function FeaturedProjects() {
  const { data: featuredProjects, isLoading } = useFeaturedProjects()
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)
  const cardSize = size === 'small' ? 'medium' : 'xlarge'

  return (
    <Box fill>
      <SpacedHeading
        level={2}
        size='1.5rem'
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        textAlign='center'
        fill
        margin={{ bottom: 'medium', top: '0' }}
      >
        {t('Home.DefaultHome.FeaturedProjects.heading')}
      </SpacedHeading>
      <HorizontalRuleLogo />
      {/* This is a similar scrollable container like lib-user TopProjects */}
      <Box
        as='ul'
        direction='row'
        justify='between'
        margin={{ top: 'medium', bottom: '0' }}
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
        style={{ listStyle: 'none' }}
      >
        {featuredProjects?.length ? (
          featuredProjects.map(project => (
            <ProjectCard
              key={project.slug}
              description={project.description}
              displayName={project.display_name}
              href={`https://www.zooniverse.org/projects/${project.slug}`}
              imageSrc={project.avatar_src}
              size={cardSize}
            />
          ))
        ) : (
          <Box as='li' align='center' fill>
            {t('Home.DefaultHome.FeaturedProjects.none')}
          </Box>
        )}
      </Box>
    </Box>
  )
}
