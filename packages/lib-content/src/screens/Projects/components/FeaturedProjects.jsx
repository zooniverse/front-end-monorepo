/*
  Note that this component is similar to DefaultHome > FeaturedProjects,
  but with slightly different styling and ProjectCards size,
  and we'll handle the ability for admins to edit featured projects here.
*/

import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'

export default function FeaturedProjects({ featuredProjects }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)
  const cardSize = size === 'small' ? 'medium' : 'large'

  return (
    <Box fill>
      <SpacedHeading
        level={2}
        size='1.5rem'
        color='white'
        textAlign='center'
        fill
        margin={{ bottom: 'medium', top: '0' }}
      >
        {t('Home.DefaultHome.FeaturedProjects.heading')}
      </SpacedHeading>
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
              background='light-1'
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
