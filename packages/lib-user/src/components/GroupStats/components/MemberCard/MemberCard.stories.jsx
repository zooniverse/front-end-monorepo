import { Box } from 'grommet'

import { USER } from '../../../../../test/mocks/panoptes'

import MemberCard from './MemberCard'

export default {
  title: 'Components/GroupStats/MemberCard',
  component: MemberCard,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    avatar: USER.avatar_src,
    classifications: 1234,
    displayName: USER.display_name,
    login: USER.login
  }
}

export const NoAvatar = {
  args: {
    avatar: '',
    classifications: 567,
    displayName: USER.display_name,
    login: USER.login
  }
}
