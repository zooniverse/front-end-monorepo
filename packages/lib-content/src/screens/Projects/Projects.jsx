'use client'

import { ProjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import styled from 'styled-components'

import ContainerBox from '@components/PageLayout/ContainerBox'
import FeaturedProjects from './components/FeaturedProjects'

const StyledCardsContainer = styled(Box)`
  row-gap: 30px;
  column-gap: 40px;
`

export default function ProjectsPageContainer({ featuredProjects, projects }) {
  return (
    <ContainerBox>
      <FeaturedProjects featuredProjects={featuredProjects} />
      <StyledCardsContainer
        direction='row'
        wrap
        pad={{ horizontal: '80px', top: '60px', bottom: '100px' }}
        justify='between'
      >
        {projects?.map(project => (
          <ProjectCard
            key={project.id}
            description={project.description}
            displayName={project.display_name}
            href={`/projects/${project.slug}`}
            imageSrc={project.avatar_src}
            size='large'
            state={project.state}
          />
        ))}
      </StyledCardsContainer>
    </ContainerBox>
  )
}
