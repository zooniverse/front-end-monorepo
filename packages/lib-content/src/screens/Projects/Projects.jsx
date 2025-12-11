'use client'

import { ProjectCard } from '@zooniverse/react-components'
import { ResponsiveContext } from 'grommet'
import { useContext } from 'react'

import ContainerBox from '@components/PageLayout/ContainerBox'
import FeaturedProjects from './components/FeaturedProjects'
import Organizations from './components/Organizations'
import StyledCardsContainer from './components/StyledCardsContainer'

export default function ProjectsPageContainer({
  featuredProjects,
  projects,
  organizations
}) {
  const size = useContext(ResponsiveContext)

  return (
    <>
      <FeaturedProjects featuredProjects={featuredProjects} />
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        <StyledCardsContainer>
          {projects?.map(project => (
            <li>
              <ProjectCard
                key={project.id}
                description={project.description}
                displayName={project.display_name}
                href={`/projects/${project.slug}`}
                imageSrc={project.avatar_src}
                size={size}
                state={project.state}
              />
            </li>
          ))}
        </StyledCardsContainer>
        <Organizations organizations={organizations} />
      </ContainerBox>
    </>
  )
}
