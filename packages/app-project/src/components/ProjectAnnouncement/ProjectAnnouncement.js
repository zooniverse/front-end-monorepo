import { string, func } from 'prop-types'
import React from 'react'

import { Media } from '@shared/components/Media'
import NarrowProjectAnnouncement from './components/NarrowProjectAnnouncement'
import WideProjectAnnouncement from './components/WideProjectAnnouncement'

function ProjectAnnouncement (props) {
  return (
    <>
      <Media at='default'>
        <NarrowProjectAnnouncement {...props} />
      </Media>

      <Media greaterThan='default'>
        <WideProjectAnnouncement {...props} />
      </Media>
    </>
  )
}

ProjectAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func.isRequired
}

export default ProjectAnnouncement
