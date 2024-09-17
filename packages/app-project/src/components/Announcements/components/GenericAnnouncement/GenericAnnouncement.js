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
      pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      gap='small'
      justify='between'
    >
      <Box
        align='center'
        gap='small'
        justify='center'
        width='100%'
      >
        <Markdownz components={markdownzComponents}>{announcement}</Markdownz>
        {children}
      </Box>
      {dismissable && <CloseButton color='black' closeFn={closeFn} />}
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
