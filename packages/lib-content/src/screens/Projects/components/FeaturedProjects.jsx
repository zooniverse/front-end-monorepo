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

const StyledBox = styled(Box)`
  list-style: none;
  column-gap: 30px;
  margin: 0 30px 40px;

  @media (min-width: 48rem) {
    column-gap: 45px;
    margin: 0 30px 60px;
  }

  @media (min-width: 90rem) {
    column-gap: 60px;
    margin: 0 30px 60px;
  }
`

export default function FeaturedProjects({ featuredProjects }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)
  const cardSize = size === 'small' ? 'medium' : 'large'

  return (
    <Box>
      <SpacedHeading
        level={2}
        size='2rem'
        color='white'
        textAlign='center'
        fill
        margin={{ vertical: '30px' }}
      >
        {t('Home.DefaultHome.FeaturedProjects.heading')}
      </SpacedHeading>
      <StyledBox
        forwardedAs='ul'
        direction='row'
        overflow={{ horizontal: 'auto' }}
        pad='none'
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
      </StyledBox>
    </Box>
  )
}
