import { Box } from 'grommet'
import { CloseButton, Markdownz } from '@zooniverse/react-components'
import { bool, string, func } from 'prop-types'

import markdownzComponents from './markdownzComponents'

const DEFAULT_HANDLER = () => {}

function GenericAnnouncement({
  announcement = '',
  children,
  closeFn = DEFAULT_HANDLER,
  color = 'neutral-2',
  dismissable = false
}) {
  return (
    <Box
      direction='row'
      fill='horizontal'
      background={color}
      align='center'
      pad='small'
      gap='small'
      justify='between'
    >
      <Box justify='center' width='100%'>
        <Box align='center' direction='row' gap='small'>
          <Markdownz components={markdownzComponents}>{announcement}</Markdownz>
          {children}
        </Box>
      </Box>
      {dismissable && <CloseButton closeFn={closeFn} />}
    </Box>
  )
}

GenericAnnouncement.propTypes = {
  announcement: string.isRequired,
  closeFn: func,
  color: string.isRequired,
  dismissable: bool
}

export default GenericAnnouncement
