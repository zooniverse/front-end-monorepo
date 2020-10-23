import { bool, node } from 'prop-types'
import React from 'react'
import { Box } from 'grommet'
import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'
import { ZooFooter } from '@zooniverse/react-components'

function StandardLayout (props) {
  const { children, inBeta } = props
  return (
    <Box border={(inBeta) ? { color: 'brand', size: 'medium' } : false}>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      {children}
      <ZooFooter />
    </Box>
  )
}

StandardLayout.propTypes = {
  children: node,
  inBeta: bool
}

export default StandardLayout
