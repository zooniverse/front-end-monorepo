import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { bool, string, func } from 'prop-types'

import markdownzComponents from '../../helpers/markdownzComponents'

function NarrowGenericAnnouncement(props) {
  const {
    announcement,
    children,
    closeFn,
    color,
    dismissable
  } = props

  return (
    <Box align='center' background={color} fill='horizontal' pad={{ horizontal: 'small', vertical: 'xsmall'} }>
      <Box align='center' direction='row' gap='small' justify='between'>
        <Markdownz components={markdownzComponents}>
          {announcement}
        </Markdownz>
        {children}
        {dismissable && 
          <CloseButton closeFn={closeFn} />}
      </Box>
    </Box>
  )
}

NarrowGenericAnnouncement.defaultProps = {
  dismissable: false,
  closeFn: () => {}
}

NarrowGenericAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func,
  color: string.isRequired,
  dismissable: bool
}

export default NarrowGenericAnnouncement
