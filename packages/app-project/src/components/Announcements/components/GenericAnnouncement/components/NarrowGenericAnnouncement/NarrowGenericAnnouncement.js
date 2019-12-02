import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { string, func } from 'prop-types'
import React from 'react'

import markdownzComponents from '../../helpers/markdownzComponents'

function NarrowGenericAnnouncement(props) {
  const { announcement, closeFn, color } = props
  return (
    <Box align='center' background={color} fill='horizontal' pad='small'>
      <Box align='center' direction='row' gap='small' justify='between'>
        <Markdownz components={markdownzComponents}>
          {announcement}
        </Markdownz>
        <CloseButton closeFn={closeFn} />
      </Box>
    </Box>
  )
}

NarrowGenericAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func,
  color: string.isRequired,
}

export default NarrowGenericAnnouncement
