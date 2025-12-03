'use client'

import { ProjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'

export default function ProjectsPageContainer({ activeProjects }) {

  return (
    <Box direction='row' wrap>
      {activeProjects.map(project => (
        <ProjectCard
          key={project.id}
          description={project.description}
          displayName={project.display_name}
          href={`/projects/${project.slug}`}
          imageSrc={project.avatar_src}
          size='medium'
          state={project.state}
        />
      ))}
    </Box>
  )
}
