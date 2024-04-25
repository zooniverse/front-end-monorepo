import { Box } from 'grommet'
import { Link } from 'grommet-icons'

import CopyIcon from '../../GroupStats/components/CopyIcon'

import HeaderToast from './HeaderToast'

export default {
  title: 'Components/shared/HeaderToast',
  component: HeaderToast,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      fill
      pad='30px'
    >
      <Box direction='row' flex='shrink'>
        <Story />
      </Box>
      <p>Paste copied text here:</p>
      <textarea />
    </Box>
  )
}

export const CopyJoinLink = {
  args: {
    icon: <Link color='white' size='small' />,
    label: 'Copy Join Link',
    message: 'Join Link Copied!',
    textToCopy: 'groups/1234?join_token=56789'
  }
}

export const ShareGroup = {
  args: {
    icon: <CopyIcon color='white' size='small' />,
    label: 'Share Group',
    message: 'Group Link Copied!',
    textToCopy: 'zooniverse.org/groups/1234'
  }
}
