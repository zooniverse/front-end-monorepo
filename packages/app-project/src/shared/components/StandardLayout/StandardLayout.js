import { node } from 'prop-types'
import React from 'react'
import ProjectAnnouncement from '@components/ProjectAnnouncement'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'


function StandardLayout (props) {
  const { children } = props
  return (
    <>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <ProjectAnnouncement />
      {children}
    </>
  )
}

StandardLayout.propTypes = {
  children: node
}

export default StandardLayout
