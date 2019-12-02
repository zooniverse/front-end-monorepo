import { node } from 'prop-types'
import React from 'react'
import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'


function StandardLayout (props) {
  const { children } = props
  return (
    <>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      {children}
    </>
  )
}

StandardLayout.propTypes = {
  children: node
}

export default StandardLayout
