'use client'

import { ProjectCard } from '@zooniverse/react-components'
import { Box, ResponsiveContext } from 'grommet'
import styled from 'styled-components'
import { useContext } from 'react'

import ContainerBox from '@components/PageLayout/ContainerBox'
import FeaturedProjects from './components/FeaturedProjects'

const StyledCardsContainer = styled(Box)`
  column-gap: 20px;
  row-gap: 20px;
  padding: 30px 20px 50px;

  @media (min-width: 48rem) {
    column-gap: 30px;
    padding: 60px 80px 100px;
  }

  @media (min-width: 90rem) {
    row-gap: 30px;
    column-gap: 40px;
    padding: 60px 80px 100px;
  }
`

export default function ProjectsPageContainer({ featuredProjects, projects }) {
  const size = useContext(ResponsiveContext)

  return (
    <>
      <FeaturedProjects featuredProjects={featuredProjects} />
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        <StyledCardsContainer direction='row' wrap justify='between'>
          {projects?.map(project => (
            <ProjectCard
              key={project.id}
              description={project.description}
              displayName={project.display_name}
              href={`/projects/${project.slug}`}
              imageSrc={project.avatar_src}
              size={size}
              state={project.state}
            />
          ))}
        </StyledCardsContainer>
      </ContainerBox>
    </>
  )
}
