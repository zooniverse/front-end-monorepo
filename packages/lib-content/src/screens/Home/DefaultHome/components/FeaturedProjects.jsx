/* Note that this component will also be used in the redesigned Projects landing page
so it could be moved to lib-react-components at that time */

import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import useSWR from 'swr'
import { useTranslation } from '@translations/i18n.jsx'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'

import HorizontalRuleLogo from '../../../../components/HorizontalRuleLogo/HorizontalRuleLogo.jsx'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

const PANOPTES_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://www.zooniverse.org/api'
    : 'https://panoptes-staging.zooniverse.org/api'

const getFeaturedProjects = async () => {
  const query = {
    featured: true,
    launch_approved: true,
    cards: true
  }

  const queryParams = new URLSearchParams(query).toString()

  try {
    const response = await fetch(`${PANOPTES_HOST}/projects?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json; version=1'
      }
    })
    const data = await response.json()
    return data.projects
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
