'use client'

import { Projects } from '@zooniverse/content'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../contexts'

function ProjectsContainer({
  featuredProjects,
  numProjects,
  projects,
  organizations
}) {
  // If adminMode is on, show a checkbox in the filters to optionally include all projects including not-launch-approved
  const { adminMode } = useContext(PanoptesAuthContext)

  return (
    <Projects
      adminMode={adminMode}
      featuredProjects={featuredProjects}
      numProjects={numProjects}
      projects={projects}
      organizations={organizations}
    />
  )
}

export default ProjectsContainer
