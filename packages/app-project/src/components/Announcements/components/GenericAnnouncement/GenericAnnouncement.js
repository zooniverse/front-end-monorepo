import { string, func } from 'prop-types'
import React from 'react'

import { Media } from '@shared/components/Media'
import NarrowGenericAnnouncement from './components/NarrowGenericAnnouncement'
import WideGenericAnnouncement from './components/WideGenericAnnouncement'

function GenericAnnouncement (props) {
  return (
    <>
      <Media at='default'>
        <NarrowGenericAnnouncement {...props} />
      </Media>

      <Media greaterThan='default'>
        <WideGenericAnnouncement {...props} />
      </Media>
    </>
  )
}

GenericAnnouncement.propTypes = {
  announcement: string.isRequired,
  color: string.isRequired,
  closeFn: func.isRequired
}

export default GenericAnnouncement
