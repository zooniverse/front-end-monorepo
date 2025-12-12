'use client'

import { Projects } from '@zooniverse/content'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../contexts'

function ProjectsContainer(props) {
  const { adminMode } = useContext(PanoptesAuthContext)

  return <Projects adminMode={adminMode} {...props} />
}

export default ProjectsContainer
