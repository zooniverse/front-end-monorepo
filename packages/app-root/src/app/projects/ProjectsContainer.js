'use client'

import { Projects } from '@zooniverse/content'
import { useContext } from 'react'
import { ResponsiveContext } from 'grommet'

import { PanoptesAuthContext } from '../../contexts'

function ProjectsContainer({
  featuredProjects,
  numProjects,
  projects,
  organizations
}) {
  // If adminMode is on, show a checkbox in the filters to optionally include all projects including not-launch-approved
  const { adminMode } = useContext(PanoptesAuthContext)

  // If mobile screen width (detected client-side), page_size becomes 10
  const size = useContext(ResponsiveContext)
  const initialProjects = size === 'small' ? projects.slice(0, 9) : projects

  return (
    <Projects
      adminMode={adminMode}
      featuredProjects={featuredProjects}
      numProjects={numProjects}
      projects={initialProjects}
      organizations={organizations}
    />
  )
}

export default ProjectsContainer
