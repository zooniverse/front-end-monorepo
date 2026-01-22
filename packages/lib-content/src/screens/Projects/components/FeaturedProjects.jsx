/*
  Note that this component is similar to DefaultHome > FeaturedProjects,
  but with slightly different styling and ProjectCards size,
  and we'll handle the ability for admins to edit featured projects here.
*/

import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const StyledList = styled(Box)`
  list-style: none;
  column-gap: 30px;
  margin: 0 0 40px 20px;
  padding: 0 20px 0 0;

  @media (min-width: 48rem) {
    column-gap: 50px;
    margin: 0 0 60px 30px;
    padding: 0 30px 0 0;
  }

  @media (min-width: 90rem) {
    column-gap: 60px;
    margin: 0 30px 60px;
    padding: 0;
  }
`

export default function FeaturedProjects({ featuredProjects }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)

  return (
    <Box>
      <SpacedHeading
        level={2}
        size={size === 'small' ? '1.5rem' : '2rem'}
        color='light-3'
        textAlign='center'
        fill
        margin={{ top: 'none', bottom: '30px' }}
      >
        {t('Home.DefaultHome.FeaturedProjects.heading')}
      </SpacedHeading>
      <StyledList
        forwardedAs='ul'
        direction='row'
        overflow={{ horizontal: 'auto' }}
        pad='none'
      >
        {featuredProjects?.length ? (
          featuredProjects.map(project => (
            <li key={project.slug}>
              <ProjectCard
                description={project.description}
                displayName={project.display_name}
                href={`https://www.zooniverse.org/projects/${project.slug}`}
                imageSrc={project.avatar_src}
                size={size}
                background={{ light: 'light-1', dark: 'dark-1' }}
              />
            </li>
          ))
        ) : (
          <Box as='li' align='center' fill>
            {t('Home.DefaultHome.FeaturedProjects.none')}
          </Box>
        )}
      </StyledList>
    </Box>
  )
}
