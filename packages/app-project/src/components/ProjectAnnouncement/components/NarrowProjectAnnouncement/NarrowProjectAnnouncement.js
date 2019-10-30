import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { string, func } from 'prop-types'
import React from 'react'

import markdownzComponents from '../../helpers/markdownzComponents'

function NarrowProjectAnnouncement(props) {
  const { announcement, closeFn } = props
  return (
    <Box align='center' background='neutral-4' fill='horizontal' pad='small'>
      <Box align='center' direction='row' gap='small' justify='between'>
        <Markdownz components={markdownzComponents}>
          {announcement}
        </Markdownz>
        <CloseButton closeFn={closeFn} />
      </Box>
    </Box>
  )
}

NarrowProjectAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func.isRequired
}

export default NarrowProjectAnnouncement
