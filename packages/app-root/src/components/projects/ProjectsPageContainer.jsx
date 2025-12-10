'use client'

import { ProjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'

export default function ProjectsPageContainer({ projects }) {

  return (
    <Box direction='row' wrap>
      {projects.map(project => (
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
